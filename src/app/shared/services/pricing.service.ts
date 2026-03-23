import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Currency } from '@shared/interfaces';
import { ActionSetCurrency } from '@app/core/store/ui.actions';
import { selectCurrency } from '@app/core/store/ui.selectors';
import { CatalogRepository } from '@app/core/firebase/catalog.repository';

/**
 * PricingService
 *
 * Responsabilités :
 *  - Fournir la devise active et formater les prix selon la langue.
 *  - Les prix des articles viennent directement des items Firebase (priceXAF / EUR).
 *
 * Devises supportées :
 *  - EUR (€)    : langue 'fr' ou 'en'
 *  - XAF (FCFA) : langue 'fr' uniquement, taux fixe 1 EUR = 655.957 FCFA
 */
@Injectable({ providedIn: 'root' })
export class PricingService {

  /** Observable de la devise active — source : NgRx store. */
  readonly currency$: Observable<Currency>;

  /** Snapshot synchrone utilisé dans format() et tvaRate. */
  private _currency: Currency = 'XAF';

  /** Langue active (snapshot synchrone). */
  private _lang = 'fr';

  private readonly EUR_TO_XAF = 655.96;
  private readonly RATES: Record<string, number> = { fr: 1, en: 1.08 };
  private readonly SYMBOLS: Record<string, string> = { fr: '€', en: '$' };

  /** Surcharges de prix (nœud prices/ Firebase — conservé pour compatibilité ascendante). */
  private priceOverridesXAF: Record<string, number> = {};

  constructor(
    private translate: TranslateService,
    private store: Store<any>,
    private catalogRepository: CatalogRepository,
  ) {
    this.currency$ = this.store.select(selectCurrency);
    this.currency$.subscribe(c => { this._currency = c; });

    this.catalogRepository.watchPriceOverrides().subscribe(overrides => {
      this.priceOverridesXAF = overrides;
    });

    this.translate.onLangChange.subscribe(({ lang }) => {
      this._lang = lang;
      if (lang !== 'fr') {
        localStorage.removeItem('currency');
        this.setCurrency('EUR');
      }
    });
  }

  get currency(): Currency { return this._currency; }
  get eurToXaf(): number { return this.EUR_TO_XAF; }

  /**
   * Retourne le prix effectif en EUR.
   * Si une surcharge Firebase existe (prices/ node), elle prend le dessus sur defaultEur.
   */
  getEffectiveEur(reference: string, defaultEur: number): number {
    const xaf = this.priceOverridesXAF[reference];
    return xaf != null ? Math.round((xaf / this.EUR_TO_XAF) * 100) / 100 : defaultEur;
  }

  /** Prix en FCFA effectif pour affichage. */
  getEffectiveXAF(reference: string, defaultEur: number): number {
    const xaf = this.priceOverridesXAF[reference];
    return xaf != null ? xaf : Math.round(defaultEur * this.EUR_TO_XAF);
  }

  /** TVA applicable : 0% en FCFA, 10% en EUR. */
  get tvaRate(): number { return this._currency === 'XAF' ? 0 : 0.10; }

  /** Change la devise : persiste en localStorage et dispatche une action NgRx. */
  setCurrency(currency: Currency): void {
    localStorage.setItem('currency', currency);
    this.store.dispatch(new ActionSetCurrency({ currency }));
  }

  /** Formate un prix en EUR selon la langue et la devise actives. */
  format(priceEur: number): string {
    return this.formatAmount(this.formatRaw(priceEur));
  }

  /**
   * Retourne la valeur numérique dans la devise d'affichage (arrondie),
   * sans le suffixe. Utile pour sommer des montants item par item
   * avant d'afficher le total, afin d'éviter les écarts d'arrondi.
   */
  formatRaw(priceEur: number): number {
    if (this._currency === 'XAF') {
      return Math.round(priceEur * this.EUR_TO_XAF / 100) * 100;
    }
    const rate = this.RATES[this._lang] ?? 1;
    const raw  = priceEur * rate;
    return raw >= 1 ? Math.round(raw) : parseFloat(raw.toFixed(2));
  }

  /** Formate un montant déjà exprimé dans la devise d'affichage (sans conversion). */
  formatAmount(amount: number): string {
    if (this._currency === 'XAF') {
      return `${amount.toLocaleString('fr-FR')} FCFA`;
    }
    const lang   = this._lang;
    const symbol = this.SYMBOLS[lang] ?? '€';
    const value  = amount >= 1 ? Math.round(amount).toString() : amount.toFixed(2);
    return lang === 'en' ? `${symbol}${value}` : `${value} ${symbol}`;
  }
}
