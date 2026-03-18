import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITEMS_PRICES, ItemsPrices } from '@helpers/items-prices.const';
import { ItemsCategoriesEnum } from '@shared/interfaces';

/**
 * PricingService
 *
 * Responsabilités :
 *  - Fournir le prix d'un item à partir de la source de données actuelle.
 *  - Convertir et formater le prix selon la langue sélectionnée.
 *
 * Pour externaliser les prix vers une API :
 *  → Injecter HttpClient, charger les prix dans loadFromApi(),
 *    remplacer this.prices par la réponse HTTP.
 *  → L'interface publique (getPrice, format) reste identique.
 */
@Injectable({ providedIn: 'root' })
export class PricingService {

  private readonly prices: ItemsPrices = ITEMS_PRICES;

  // Taux de conversion EUR → devise cible
  private readonly RATES: Record<string, number> = {
    fr: 1,
    en: 1.08,
  };

  private readonly SYMBOLS: Record<string, string> = {
    fr: '€',
    en: '$',
  };

  constructor(private translate: TranslateService) {}

  /** Retourne le prix en EUR pour un item donné (0 si non trouvé). */
  getPrice(category: ItemsCategoriesEnum, id: number): number {
    const key = this.categoryKey(category);
    return key ? (this.prices[key]?.[id] ?? 0) : 0;
  }

  /** Formate un prix en EUR selon la langue active. */
  format(priceEur: number): string {
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
