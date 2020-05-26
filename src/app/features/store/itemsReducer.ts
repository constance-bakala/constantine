import {ItemInfos} from '@shared/interfaces';
import {ItemsActions, ItemsActionTypes} from '@app/features/store/items.actions';
import {toogleSelectItem, updateItemState} from '@helpers/store.utils';


export interface ItemsState {
  earings: ItemInfos[];
  dresses: ItemInfos[];
  masks: ItemInfos[];
}

const intialState: ItemsState = {
  earings: [],
  dresses: [],
  masks: []
};

export function itemsReducer(state: ItemsState = intialState,
                             action: ItemsActions): ItemsState {
  switch (action.type) {
    case ItemsActionTypes.TOOGLE_SELECT_ITEM:
      return toogleSelectItem(state, action.payload);
    case ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS:
      return updateItemState(state, action.payload.items, action.payload.category, false);
    default:
      return state;
  }
}
