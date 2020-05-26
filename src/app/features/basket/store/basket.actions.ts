import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ItemInfos} from '@shared/interfaces';

export enum BasketActionTypes {
  RETRIEVE_ITEMS = '[BASKET] Retrieve items',
  RETRIEVE_ITEMS_SUCCESS = '[BASKET] Retrieved items successfully',
  RETRIEVE_ITEMS_ERROR = '[BASKET] Fail retrieving items',

  TOOGLE_ITEM = '[BASKET] Add or Remove item',
  TOOGLE_ITEM_SUCCESS = '[BASKET] Item Added or Removed successfully',
  TOOGLE_ITEM_ERROR = '[BASKET] Fail toogle item',
}

///////////////////////// RETRIEVE OPERATION ///////////////////
export class ActionBasketRetrieveItems implements Action {
  readonly type = BasketActionTypes.RETRIEVE_ITEMS;

  constructor() {
  }
}

export class ActionBasketRetrieveItemSuccess implements Action {
  readonly type = BasketActionTypes.RETRIEVE_ITEMS_SUCCESS;

  constructor(public payload: ItemInfos[]) {
  }
}
export class ActionBasketRetrieveItemError implements Action {
  readonly type = BasketActionTypes.RETRIEVE_ITEMS_ERROR;

  constructor(public payload: { error: string }) {
  }
}
///////////////////////// ADD OPERATION ///////////////////
export class ActionBasketToogleItem implements Action {
  readonly type = BasketActionTypes.TOOGLE_ITEM;

  constructor(public payload: ItemInfos) {
  }
}

export class ActionBasketToogleItemSuccess implements Action {
  readonly type = BasketActionTypes.TOOGLE_ITEM_SUCCESS;

  constructor(public payload: ItemInfos) {
  }
}

export class ActionBasketToogleItemError implements Action {
  readonly type = BasketActionTypes.TOOGLE_ITEM_ERROR;

  constructor(public payload: { error: HttpErrorResponse }) {
  }
}

export type BasketActions =
  | ActionBasketRetrieveItems
  | ActionBasketRetrieveItemSuccess
  | ActionBasketRetrieveItemError
  | ActionBasketToogleItem
  | ActionBasketToogleItemSuccess
  | ActionBasketToogleItemError;


