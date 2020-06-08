import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {ItemsState} from '@app/features/store';
import * as _ from 'lodash'

export function findItemByReference(items: ItemInfos[], reference: string): ItemInfos {
  return items.find(e => e.payload.reference === reference);
}

export function addItem(items: ItemInfos[], newItem: ItemInfos): ItemInfos[] {
  if (!findItemByReference(items, newItem.payload.reference)) {
    items.push(newItem);
  }
  return items;
}

export function toogleBasketItem(items: ItemInfos[], newItem: ItemInfos): ItemInfos[] {
  let itemsCopy = [...items];
  if (!findItemByReference(itemsCopy, newItem.payload.reference)) {
    itemsCopy = addItem(itemsCopy, newItem);
  } else {
    itemsCopy = removeItem(itemsCopy, newItem.payload.reference)
  }
  return itemsCopy;
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

  return category;
}

export function toogleSelectItem(state: ItemsState, anItem: ItemInfos): ItemsState {
  let category = getCategoryByName(state, anItem.payload.category);
  let foundItem: ItemInfos = findItemByReference(category.items, anItem.payload.reference);
  if (!!foundItem) {
    foundItem.payload.selected = !foundItem.payload.selected;
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
  if(items.length == 0){
    return true;
  }
  return overrideExisting;
}

export function removeItem(items: ItemInfos[], reference: string): ItemInfos[] {
  let item = findItemByReference(items, reference);
  if (!!item) {
    items.splice(items.indexOf(item), 1);
  }
  return items;
}
