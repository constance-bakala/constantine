import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ITEMS_PRICES, ItemsPrices } from '@helpers/items-prices.const';
import { Currency, ItemsCategoriesEnum } from '@shared/interfaces';
import { ActionSetCurrency } from '@app/core/store/ui.actions';
import { selectCurrency } from '@app/core/store/ui.selectors';

/**
 * PricingService
 *
 * Responsabilités :
 *  - Fournir le prix d'un item à partir de la source de données actuelle.
 *  - Convertir et formater le prix selon la langue et la devise sélectionnées.
 *
 * Devises supportées :
 *  - EUR (€)  : langue 'fr' ou 'en'
 *  - XAF (FCFA) : langue 'fr' uniquement, taux fixe 1 EUR = 655.957 FCFA, TVA = 0%
 *
 * Source de vérité : NgRx store (clé `ui.currency`), persisté dans localStorage.
 */
@Injectable({ providedIn: 'root' })
export class PricingService {

  /** Observable de la devise active — source : NgRx store. */
  readonly currency$: Observable<Currency>;

  /** Snapshot synchrone utilisé dans format() et tvaRate. */
  private _currency: Currency = 'XAF';

  private readonly prices: ItemsPrices = ITEMS_PRICES;
  private readonly EUR_TO_XAF = 655.96;
  private readonly RATES: Record<string, number> = { fr: 1, en: 1.08 };
  private readonly SYMBOLS: Record<string, string> = { fr: '€', en: '$' };

  constructor(private translate: TranslateService, private store: Store<any>) {
    this.currency$ = this.store.select(selectCurrency);

    // Maintient le snapshot synchrone à jour
    this.currency$.subscribe(c => { this._currency = c; });

    // Passage en anglais : toujours EUR, on efface le choix sauvegardé
    this.translate.onLangChange.subscribe(({ lang }) => {
      if (lang !== 'fr') {
        localStorage.removeItem('currency');
        this.setCurrency('EUR');
      }
      // Passage en français : on conserve le choix de l'utilisateur
    });
  }

  get currency(): Currency { return this._currency; }

  /** TVA applicable : 0% en FCFA, 10% en EUR. */
  get tvaRate(): number { return this._currency === 'XAF' ? 0 : 0.10; }

  /** Change la devise : persiste en localStorage et dispatche une action NgRx. */
  setCurrency(currency: Currency): void {
    localStorage.setItem('currency', currency);
    this.store.dispatch(new ActionSetCurrency({ currency }));
  }

  /** Retourne le prix en EUR pour un item donné (0 si non trouvé). */
  getPrice(category: ItemsCategoriesEnum, id: number): number {
    const key = this.categoryKey(category);
    return key ? (this.prices[key]?.[id] ?? 0) : 0;
  }

  /** Formate un prix en EUR selon la langue et la devise actives. */
  format(priceEur: number): string {
    if (this._currency === 'XAF') {
      const value = Math.round(priceEur * this.EUR_TO_XAF / 100) * 100;
      return `${value.toLocaleString('fr-FR')} FCFA`;
    }

    const lang   = this.translate.currentLang ?? 'fr';
    const rate   = this.RATES[lang]   ?? 1;
    const symbol = this.SYMBOLS[lang] ?? '€';
    const value  = Math.round(priceEur * rate);

    return lang === 'en' ? `${symbol}${value}` : `${value} ${symbol}`;
  }

  private categoryKey(category: ItemsCategoriesEnum): keyof ItemsPrices | null {
    switch (category) {
      case ItemsCategoriesEnum.MASKS:   return 'masks';
      case ItemsCategoriesEnum.DRESSES: return 'dresses';
      case ItemsCategoriesEnum.EARINGS: return 'earings';
      default: return null;
    }
  }
}
