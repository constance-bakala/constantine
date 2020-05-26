import {ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {ItemsState} from '@app/features/store';
import {IBasketState} from '@app/features/basket/store';

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

export function getItemsByCategory(state, category: ItemsCategoriesEnum): ItemInfos[] {
  let items: ItemInfos[];
  switch (category) {
    case ItemsCategoriesEnum.EARINGS:
      items = [...state.earings];
      break;
    case ItemsCategoriesEnum.MASKS:
      items = [...state.masks];
      break;
    case ItemsCategoriesEnum.DRESSES:
      items = [...state.dresses];
      break;
    default:
      items = [];
  }

  return items;
}

export function toogleSelectItem(state: ItemsState, anItem: ItemInfos): ItemsState {
  let items = getItemsByCategory(state, anItem.payload.category);
  let foundItem: ItemInfos = findItemByReference(items, anItem.payload.reference);
  if (!!foundItem) {
    foundItem.payload.selected = !foundItem.payload.selected;
  }
  return updateItemState(state, items, anItem.payload.category)
}

export function updateItemState(state: ItemsState, items: ItemInfos[], category: ItemsCategoriesEnum, overrideExisting: boolean = true): ItemsState {
  switch (category) {
    case ItemsCategoriesEnum.EARINGS:
      if (canOverride(state.earings, overrideExisting)) {
        return {
          ...state,
          earings: items
        };
      } else {
        return state;
      }
    case ItemsCategoriesEnum.MASKS:
      if (canOverride(state.masks, overrideExisting)) {
        return {
          ...state,
          masks: items
        };
      } else {
        return state;
      }
    case ItemsCategoriesEnum.DRESSES:
      if (canOverride(state.dresses, overrideExisting)) {
        return {
          ...state,
          dresses: items
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
