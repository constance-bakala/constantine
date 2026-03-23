import { Category, ItemInfos, ItemsCategoriesEnum, ItemSizeEnum, ItemsState } from '@shared/interfaces';
import * as _ from 'lodash'

export function findItemByReference(items: ItemInfos[], reference: string): ItemInfos | undefined {
  return items.find(e => e.reference === reference);
}

export function updateItemBasketInfos(state: ItemsState, itemToUpdateRawValue: any): ItemsState {
  let itemsStateCopy = _.cloneDeep(state);
  let category = (itemsStateCopy as any)[itemToUpdateRawValue.category.toLowerCase()];
  if (!category) return state;
  let foundItem: ItemInfos = category.items.find(
    (item: ItemInfos) => item.reference === itemToUpdateRawValue.reference
  );
  if (foundItem) {
    foundItem.basketInfos.selectedQuantity = Math.max(1, itemToUpdateRawValue.basketInfos?.selectedQuantity ?? 1);
    foundItem.basketInfos.selectedModel = itemToUpdateRawValue.basketInfos.selectedModel;
    foundItem.basketInfos.selectedSize = (ItemSizeEnum as any)[itemToUpdateRawValue.basketInfos.selectedSize]
      ?? itemToUpdateRawValue.basketInfos.selectedSize;
    foundItem.selected = itemToUpdateRawValue?.selected ?? true;
  }
  return itemsStateCopy;
}

export function getCategoryByName(state: any, categoryName: ItemsCategoriesEnum): Category | undefined {
  let category: Category | undefined;
  switch (categoryName) {
    case ItemsCategoriesEnum.EARINGS:
      category = _.cloneDeep(state.earings);
      break;
    case ItemsCategoriesEnum.DRESSES:
      category = _.cloneDeep(state.dresses);
      break;
    case ItemsCategoriesEnum.MASKS:
      category = _.cloneDeep(state.masks);
      break;
    default:
      category = undefined;
  }

  return category;
}

export function toogleSelectItem(state: ItemsState, anItem: ItemInfos, forceSelect?: boolean): ItemsState {
  let category = getCategoryByName(state, anItem.category);
  if (!category) {
    return state;
  }
  let foundItem: ItemInfos | undefined = findItemByReference(category.items || [], anItem.reference);
  if (!!foundItem && !forceSelect) {
    foundItem.selected = !foundItem.selected;
  } else if (foundItem) {
    foundItem.selected = true;
  }
  return updateItemState(state, category)
}

export function updateItemState(state: ItemsState, category: Category | undefined, overrideExisting: boolean = true): ItemsState {
  if (!category) {
    return state;
  }
  switch (category.name) {
    case ItemsCategoriesEnum.EARINGS:
      if (canOverride(state.earings.items, overrideExisting)) {
        return {
          ...state,
          earings: category
        };
      } else {
        return state;
      }
    case ItemsCategoriesEnum.MASKS:
      if (canOverride(state.masks.items, overrideExisting)) {
        return {
          ...state,
          masks: category
        };
      } else {
        return state;
      }
    case ItemsCategoriesEnum.DRESSES:
      if (canOverride(state.dresses.items, overrideExisting)) {
        return {
          ...state,
          dresses: category
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

export function canOverride(items: ItemInfos[], overrideExisting: boolean = true): boolean {
  if (items.length == 0) {
    return true;
  }
  return overrideExisting;
}
