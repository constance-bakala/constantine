import { Category, ItemInfos, ItemSizeEnum, ItemsState } from '@shared/interfaces';
import * as _ from 'lodash';

export function findItemByReference(items: ItemInfos[], reference: string): ItemInfos | undefined {
  return items.find(e => e.reference === reference);
}

export function updateItemBasketInfos(state: ItemsState, itemToUpdateRawValue: any): ItemsState {
  const stateCopy = _.cloneDeep(state);
  const key = itemToUpdateRawValue.category?.toLowerCase?.() ?? '';
  let category: Category | undefined = stateCopy.categories[key];

  if (!category) {
    // Catégorie non trouvée par clé : cherche l'item par référence dans toutes les catégories
    for (const cat of Object.values(stateCopy.categories)) {
      const found = cat.items.find((i: ItemInfos) => i.reference === itemToUpdateRawValue.reference);
      if (found) { category = cat; break; }
    }
  }

  if (!category) return state;

  const foundItem = category.items.find(
    (item: ItemInfos) => item.reference === itemToUpdateRawValue.reference
  );
  if (foundItem) {
    foundItem.basketInfos.selectedQuantity = Math.max(1, itemToUpdateRawValue.basketInfos?.selectedQuantity ?? 1);
    foundItem.basketInfos.selectedModel = itemToUpdateRawValue.basketInfos.selectedModel;
    foundItem.basketInfos.selectedSize = (ItemSizeEnum as any)[itemToUpdateRawValue.basketInfos.selectedSize]
      ?? itemToUpdateRawValue.basketInfos.selectedSize;
    foundItem.selected = itemToUpdateRawValue?.selected ?? true;
  }
  return stateCopy;
}

export function toogleSelectItem(state: ItemsState, anItem: ItemInfos, forceSelect?: boolean): ItemsState {
  const key = anItem.category?.toLowerCase?.() ?? '';
  let category: Category | undefined;

  if (state.categories[key]) {
    category = _.cloneDeep(state.categories[key]);
  } else {
    // Catégorie non trouvée : cherche par référence dans toutes les catégories
    for (const [, cat] of Object.entries(state.categories)) {
      if (cat.items.find(i => i.reference === anItem.reference)) {
        category = _.cloneDeep(cat);
        break;
      }
    }
  }

  if (!category) return state;

  const foundItem = findItemByReference(category.items || [], anItem.reference);
  if (foundItem) {
    foundItem.selected = forceSelect ? true : !foundItem.selected;
  }
  return updateItemState(state, category);
}

export function updateItemState(state: ItemsState, category: Category | undefined, overrideExisting: boolean = true): ItemsState {
  if (!category) return state;
  const key = category.name;
  const existing = state.categories[key];
  if (existing && existing.items.length > 0 && !overrideExisting) {
    return state;
  }
  return {
    categories: {
      ...state.categories,
      [key]: category
    }
  };
}
