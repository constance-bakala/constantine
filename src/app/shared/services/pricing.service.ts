import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ITEMS_PRICES, ItemsPrices } from '@helpers/items-prices.const';
import { ItemsCategoriesEnum } from '@shared/interfaces';

export type Currency = 'EUR' | 'XAF';

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
 * Pour externaliser les prix vers une API :
 *  → Injecter HttpClient, charger les prix dans loadFromApi(),
 *    remplacer this.prices par la réponse HTTP.
 *  → L'interface publique (getPrice, format) reste identique.
 */
@Injectable({ providedIn: 'root' })
export class PricingService {

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe(({ lang }) => {
      this.currency$.next(lang === 'fr' ? 'XAF' : 'EUR');
    });
  }

  private readonly prices: ItemsPrices = ITEMS_PRICES;

  private readonly EUR_TO_XAF = 655.96;

  private readonly RATES: Record<string, number> = {
    fr: 1,
    en: 1.08,
  };

  private readonly SYMBOLS: Record<string, string> = {
    fr: '€',
    en: '$',
  };

  private initialCurrency(): Currency {
    const lang = this.translate.currentLang ?? localStorage.getItem('lang') ?? 'fr';
    return lang === 'fr' ? 'XAF' : 'EUR';
  }

  readonly currency$ = new BehaviorSubject<Currency>(this.initialCurrency());

  get currency(): Currency { return this.currency$.value; }

  /** TVA applicable : 0% en FCFA, 10% en EUR. */
  get tvaRate(): number { return this.currency === 'XAF' ? 0 : 0.10; }

  setCurrency(currency: Currency): void {
    this.currency$.next(currency);
  }

  /** Retourne le prix en EUR pour un item donné (0 si non trouvé). */
  getPrice(category: ItemsCategoriesEnum, id: number): number {
    const key = this.categoryKey(category);
    return key ? (this.prices[key]?.[id] ?? 0) : 0;
  }

  /** Formate un prix en EUR selon la langue et la devise actives. */
  format(priceEur: number): string {
    if (this.currency === 'XAF') {
      const value = Math.round(priceEur * this.EUR_TO_XAF);
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
