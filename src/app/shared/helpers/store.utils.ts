import {Category, ItemInfos, ItemsCategoriesEnum, ItemSizeEnum, ItemsState} from '@shared/interfaces';
import * as _ from 'lodash'

export function findItemByReference(items: ItemInfos[], reference: string): ItemInfos {
  return items.find(e => e.reference === reference);
}

export function updateItemBasketInfos(state: ItemsState, itemToUpdateRawValue): ItemsState {
  let itemsStateCopy = _.cloneDeep(state);
  let category = itemsStateCopy[itemToUpdateRawValue.category.toLowerCase()];
  let foundItem: ItemInfos = category.items[itemToUpdateRawValue.index - 1];
  if (!!foundItem && foundItem.selected) {
    foundItem.basketInfos.selectedQuantity = itemToUpdateRawValue.quantity;
    foundItem.basketInfos.selectedModel = itemToUpdateRawValue.model;
    foundItem.basketInfos.selectedSize = ItemSizeEnum[itemToUpdateRawValue.size];
  }
  return itemsStateCopy;
}

export function getCategoryByName(state, categoryName: ItemsCategoriesEnum): Category {
  let category: Category;
  switch (categoryName) {
    case ItemsCategoriesEnum.EARINGS:
      category = _.cloneDeep(state.earings);
      break;
    case ItemsCategoriesEnum.MASKS:
      category = _.cloneDeep(state.masks);
      break;
    case ItemsCategoriesEnum.DRESSES:
      category = _.cloneDeep(state.dresses);
      break;
    default:
      category = undefined;
  }

  return category as Category;
}

export function toogleSelectItem(state: ItemsState, anItem: ItemInfos, forceSelect?: boolean): ItemsState {
  let category = getCategoryByName(state, anItem.category);
  let foundItem: ItemInfos = findItemByReference(category.items, anItem.reference);
  if (!!foundItem && !forceSelect) {
    foundItem.selected = !foundItem.selected;
  } else {
    foundItem.selected = true;
  }
  return updateItemState(state, category)
}

export function updateItemState(state: ItemsState, category: Category, overrideExisting: boolean = true): ItemsState {
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
