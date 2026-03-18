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
     1: 25,  3: 28,  5: 32,  7: 35,  9: 22,
    11: 30, 13: 27, 15: 40, 17: 25, 19: 35,
    22: 28, 24: 32, 26: 20, 28: 38, 30: 30,
    33: 45, 35: 25, 38: 28, 41: 32, 44: 35,
    46: 22, 47: 40, 50: 25, 52: 30, 54: 28,
    57: 35, 59: 22, 60: 45,
  },

  dresses: {
     1: 45,  2: 55,  4: 70,  5: 80,  6: 65,
     7: 55,  8: 60,  9: 75, 11: 85, 13: 50,
    15: 90, 17: 70, 19: 65, 21: 45, 23: 55,
    24: 60, 25: 75, 26: 55, 27: 80, 28: 65,
    29: 50, 30: 70, 31: 55, 32: 45, 33: 85,
    34: 60, 35: 75, 36: 55, 38: 95, 39: 70,
    40: 60, 42: 55, 43: 80, 44: 65, 47: 45,
  },

  earings: {
     1: 15,  2: 20,  3: 18,  4: 25,  5: 15,
     6: 22,  7: 18,  8: 30,  9: 15, 10: 20,
    11: 18, 12: 35, 13: 22, 14: 15, 15: 28,
    16: 20, 17: 18,
  },

};
