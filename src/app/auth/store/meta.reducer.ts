import { Action } from '@ngrx/store';

export enum MetaActionTypes {
  HIDE_WRAPPER = '[Meta] Hide wrapper',
  DISPLAY_WRAPPER = '[Meta] Display wrapper',
  HIDE_FOOTER = '[Meta] Hide footer',
  DISPLAY_FOOTER = '[Meta] Display footer'
}

export class ActionHideWrapper implements Action {
  readonly type = MetaActionTypes.HIDE_WRAPPER;
}

export class ActionDisplayWrapper implements Action {
  readonly type = MetaActionTypes.DISPLAY_WRAPPER;
}

export class ActionHideFooter implements Action {
  readonly type = MetaActionTypes.HIDE_FOOTER;
}

export class ActionDisplayFooter implements Action {
  readonly type = MetaActionTypes.DISPLAY_FOOTER;
}

export type MetaActions =
  | ActionHideWrapper
  | ActionDisplayWrapper
  | ActionHideFooter
  | ActionDisplayFooter;

export const metaInitialState: MetaState = {
  isWrapper: true,
  isFooter: true
};

export const selectorMeta = state => state.meta;

export function metaReducer(
  state: MetaState = metaInitialState,
  action: MetaActions
): MetaState {
  switch (action.type) {
    case MetaActionTypes.HIDE_WRAPPER:
      return { ...state, isWrapper: false };

    case MetaActionTypes.DISPLAY_WRAPPER:
      return { ...state, isWrapper: true };

    case MetaActionTypes.HIDE_FOOTER:
      return { ...state, isFooter: false };

    case MetaActionTypes.DISPLAY_FOOTER:
      return { ...state, isFooter: true };

    default:
      return state;
  }
}

export interface MetaState {
  isWrapper: boolean;
  isFooter: boolean;
}
