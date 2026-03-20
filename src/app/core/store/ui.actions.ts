import { Action } from '@ngrx/store';
import { Currency } from '@shared/interfaces';

export enum UiActionTypes {
  SET_CURRENCY = '[UI] Set currency',
}

export class ActionSetCurrency implements Action {
  readonly type = UiActionTypes.SET_CURRENCY;
  constructor(public payload: { currency: Currency }) {}
}

export type UiActions = ActionSetCurrency;
