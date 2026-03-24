import { ItemsState } from '@shared/interfaces';
import { ItemsActions, ItemsActionTypes } from '@app/features/store/items.actions';
import { toogleSelectItem, updateItemBasketInfos, updateItemState } from '@helpers/store.utils';
import { AuthActionTypes } from '@app/auth/store/auth.actions';

const initialState: ItemsState = {
  categories: {}
};

export function itemsReducer(state: ItemsState = initialState,
                             action: any): ItemsState {
  switch (action.type) {
    case AuthActionTypes.LOGOUT:
    case ItemsActionTypes.CLEAR_BASKET:
      return {
        categories: Object.fromEntries(
          Object.entries(state.categories).map(([key, cat]) => [
            key,
            { ...cat, items: cat.items.map(i => ({ ...i, selected: false })) }
          ])
        )
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
