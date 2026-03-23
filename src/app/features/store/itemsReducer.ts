import {ItemsCategoriesEnum, ItemsState} from '@shared/interfaces';
import {ItemsActions, ItemsActionTypes} from '@app/features/store/items.actions';
import {toogleSelectItem, updateItemBasketInfos, updateItemState} from '@helpers/store.utils';
import {AuthActionTypes} from '@app/auth/store/auth.actions';

const intialState: ItemsState = {
  earings: {
    name: ItemsCategoriesEnum.EARINGS,
    title: 'Boucles d\'oreilles',
    summary: 'Veuillez patienter ...',
    items: []
  },
  dresses: {
    name: ItemsCategoriesEnum.DRESSES,
    title: 'Vêtements',
    summary: 'Veuillez patienter ...',
    items: []
  },
  masks: {
    name: ItemsCategoriesEnum.MASKS,
    title: 'Masques',
    summary: 'Veuillez patienter ...',
    items: []
  }
};

export function itemsReducer(state: ItemsState = intialState,
                             action: any): ItemsState {
  switch (action.type) {
    case AuthActionTypes.LOGOUT:
    case ItemsActionTypes.CLEAR_BASKET:
      return {
        ...state,
        earings: { ...state.earings, items: state.earings.items.map(i => ({ ...i, selected: false })) },
        dresses: { ...state.dresses, items: state.dresses.items.map(i => ({ ...i, selected: false })) },
        masks:   { ...state.masks,   items: state.masks.items.map(i => ({ ...i, selected: false })) },
      };
    case ItemsActionTypes.TOOGLE_SELECT_ITEM_NOT_SELECTED:
      return toogleSelectItem(state, action.payload, true);
    case ItemsActionTypes.TOOGLE_SELECT_ITEM:
      return toogleSelectItem(state, action.payload);
    case ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS:
      return updateItemState(state, action.payload, false);
    case ItemsActionTypes.UPDATE_BASKET_ITEM:
    case ItemsActionTypes.RESTORE_BASKET_ITEM:
      return updateItemBasketInfos(state, action.payload);
    default:
      return state;
  }
}
