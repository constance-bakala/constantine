import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';

export enum ItemsActionTypes {
  RETRIEVE_ITEMS = '[PORTFOLIO] Retrieve items',
  RETRIEVE_ITEMS_SUCCESS = '[PORTFOLIO] Retrieved items successfully',
  RETRIEVE_ITEMS_ERROR = '[PORTFOLIO] Fail retrieving items',

  ADD = '[PORTFOLIO] Add',
  ADD_SUCCESS = '[PORTFOLIO] Item ddded successfully',
  ADD_ERROR = '[PORTFOLIO] Fail adding item',

  TOOGLE_SELECT_ITEM = '[PORTFOLIO] Select item',
  TOOGLE_SELECT_ITEM_SUCCESS = '[PORTFOLIO] Item selected successfully',
  TOOGLE_SELECT_ITEM_ERROR = '[PORTFOLIO] Fail selected item',

  UPDATE_BASKET_ITEM = '[BASKET] Changing basket item'
}

export class ActionUpdateBasketItem implements Action {
  readonly type = ItemsActionTypes.UPDATE_BASKET_ITEM;

  constructor(public payload: ItemInfos) {
  }
}

///////////////////////// RETRIEVE OPERATION ///////////////////
export class ActionItemsRetrieve implements Action {
  readonly type = ItemsActionTypes.RETRIEVE_ITEMS;

  constructor(public payload: {
    category: ItemsCategoriesEnum
  }) {
  }
}

export class ActionItemsRetrieveSuccess implements Action {
  readonly type = ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS;

  constructor(public payload: Category) {
  }
}

export class ActionItemsRetrieveError implements Action {
  readonly type = ItemsActionTypes.RETRIEVE_ITEMS_ERROR;

  constructor(public payload: { error: HttpErrorResponse }) {
  }
}

///////////////////////// TOOGLE SELECT ITEM ///////////////////
export class ActionItemToogleSelect implements Action {
  readonly type = ItemsActionTypes.TOOGLE_SELECT_ITEM;

  constructor(public payload: ItemInfos) {
  }
}

export class ActionItemToogleSelectSuccess implements Action {
  readonly type = ItemsActionTypes.TOOGLE_SELECT_ITEM_SUCCESS;

  constructor(public payload: ItemInfos) {
  }
}

export class ActionItemToogleSelectError implements Action {
  readonly type = ItemsActionTypes.TOOGLE_SELECT_ITEM_ERROR;

  constructor(public payload: { error: HttpErrorResponse }) {
  }
}

///////////////////////// ADD OPERATION ///////////////////
export class ActionItemAdd implements Action {
  readonly type = ItemsActionTypes.ADD;

  constructor(public payload: ItemInfos) {
  }
}

export class ActionItemAddSuccess implements Action {
  readonly type = ItemsActionTypes.ADD_SUCCESS;

  constructor(public payload: ItemInfos) {
  }
}

export class ActionItemAddleError implements Action {
  readonly type = ItemsActionTypes.ADD_ERROR;

  constructor(public payload: { error: HttpErrorResponse }) {
  }
}

export type ItemsActions =
  | ActionItemsRetrieve
  | ActionItemsRetrieveSuccess
  | ActionItemsRetrieveError
  | ActionItemToogleSelect
  | ActionItemToogleSelectSuccess
  | ActionItemToogleSelectError
  | ActionUpdateBasketItem;


