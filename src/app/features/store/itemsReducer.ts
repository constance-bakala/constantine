import {ItemsCategoriesEnum, ItemsState} from '@shared/interfaces';
import {ItemsActions, ItemsActionTypes} from '@app/features/store/items.actions';
import {toogleSelectItem, updateItemBasketInfos, updateItemState} from '@helpers/store.utils';

const intialState: ItemsState = {
  earings: {
    name: ItemsCategoriesEnum.EARINGS,
    title: 'Chargement des boucles d\'oreilles',
    summary: 'Veuillez patienter ...',
    items: []
  },
  dresses: {
    name: ItemsCategoriesEnum.DRESSES,
    title: 'Chargement des vêtements',
    summary: 'Veuillez patienter ...',
    items: []
  },
  masks: {
    name: ItemsCategoriesEnum.MASKS,
    title: 'Chargement des masques',
    summary: 'Veuillez patienter ...',
    items: []
  }
};

export function itemsReducer(state: ItemsState = intialState,
                             action: ItemsActions): ItemsState {
  switch (action.type) {
    case ItemsActionTypes.TOOGLE_SELECT_ITEM_NOT_SELECTED:
      return toogleSelectItem(state, action.payload, true);
    case ItemsActionTypes.TOOGLE_SELECT_ITEM:
      return toogleSelectItem(state, action.payload);
    case ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS:
      return updateItemState(state, action.payload, false);
    case ItemsActionTypes.UPDATE_BASKET_ITEM:
      return updateItemBasketInfos(state, action.payload);
    default:
      return state;
  }
}
