/**
 * items-prices.const.ts
 *
 * Source de vérité des tarifs, en EUR.
 * Ce fichier n'est PAS généré automatiquement — les prix sont conservés
 * entre deux exécutions de "npm run generate-groups".
 *
 * Pour externaliser vers une API :
 *   → Remplacer ITEMS_PRICES dans PricingService par un appel HTTP.
 *   → L'interface du reste de l'application reste inchangée.
 *
 * Clés : identifiant numérique du groupe (correspond à ItemGroupDef.id).
 */

export interface CategoryPrices {
  [id: number]: number;
}

export interface ItemsPrices {
  masks:   CategoryPrices;
  dresses: CategoryPrices;
  earings: CategoryPrices;
}

export const ITEMS_PRICES: ItemsPrices = {

  masks: {
     1: 5,  3: 5,  5: 5,  7: 5,  9: 5,
    11: 5, 13: 5, 15: 5, 17: 5, 19: 5,
    22: 5, 24: 5, 26: 4, 28: 5, 30: 5,
    33: 5, 35: 5, 38: 5, 41: 5, 44: 5,
    46: 4, 47: 5, 50: 5, 52: 5, 54: 5,
    57: 5, 59: 4, 60: 5,
  },

  dresses: {
     1: 25,  2: 20,  3: 30,  4: 15,  5: 28,
     6: 22,  8: 18,  9: 25, 10: 30, 11: 20,
    12: 15, 14: 27, 15: 22, 16: 18, 17: 25,
    18: 30, 19: 20, 20: 15, 21: 28, 22: 22,
    23: 17, 24: 25, 25: 30, 26: 20, 27: 15,
    28: 28, 29: 22, 30: 18, 31: 25, 32: 30,
    33: 20, 34: 15, 35: 27, 36: 22, 37: 18,
    38: 25, 39: 30, 40: 20, 41: 15, 42: 28,
    43: 22, 44: 18, 45: 25, 46: 30, 47: 20,
    48: 15, 49: 27, 50: 22, 51: 18, 52: 25,
  },

  earings: {
     1: 10,  2: 15,  3:  8,  4: 12,  5: 15,
     6:  7,  7: 10,  8: 15,  9:  5, 10: 12,
    11:  8, 12: 15, 13: 10, 14:  6, 15: 14,
    16: 12, 17:  9,
  },

};
