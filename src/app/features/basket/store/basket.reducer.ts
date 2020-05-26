import {ItemInfos} from '@shared/interfaces';
import {BasketActions, BasketActionTypes} from '@app/features/basket/store/basket.actions';
import {toogleBasketItem} from '@helpers/store.utils';


export interface IBasketState {
  items: ItemInfos[];
}

const intialState: IBasketState = {
  items: []
};

export function basketReducer(state: IBasketState = intialState,
                              action: BasketActions): IBasketState {
  switch (action.type) {
    case BasketActionTypes.TOOGLE_ITEM:
      return {
        ...state,
        items: toogleBasketItem(state.items, action.payload),
      };
    default:
      return state;
  }
}
