import {Action} from '@ngrx/store';

export enum ErrorsActionTypes {
  HIDE_FUNCTIONAL_ERRORS = '[FUNCTIONAL ERROR] Hide functional errors',
  DISPLAY_FUNCTIONAL_ERRORS = '[FUNCTIONAL ERROR] Display functional errors',
}

export class ActionHideFunctionalErrors implements Action {
  readonly type = ErrorsActionTypes.HIDE_FUNCTIONAL_ERRORS;
}

export class ActionDisplayFunctionalErrors implements Action {
  readonly type = ErrorsActionTypes.DISPLAY_FUNCTIONAL_ERRORS;

  constructor(
    public payload: {
      functionalErrors: string[];
    }
  ) {
  }
}

export type FunctionalErrorsActions =
  | ActionHideFunctionalErrors
  | ActionDisplayFunctionalErrors;

export const errorsInitialState: FunctionalErrorsState = {
  displayErrors: false,
  functionalErrors: []
};

export function mergeFunctionalErrors(existingFunctionalErrors: string[], newFunctionalErrors: string[]): string[] {
  const result = [...existingFunctionalErrors];
  newFunctionalErrors.forEach(anError => {
    if (!result.includes(anError)) {
      result.push(anError);
    }
  });
  return result;
}

export const selectorFunctionalErrors = state => state.functionalErrors;

export function functionalErrorsReducer(
  state: FunctionalErrorsState = errorsInitialState,
  action: FunctionalErrorsActions
): FunctionalErrorsState {


  switch (action.type) {
    case ErrorsActionTypes.HIDE_FUNCTIONAL_ERRORS:
      return {
        ...state,
        displayErrors: false,
        functionalErrors: []
      };

    case ErrorsActionTypes.DISPLAY_FUNCTIONAL_ERRORS:
      return {
        ...state,
        displayErrors: true,
        functionalErrors: mergeFunctionalErrors(state.functionalErrors, action.payload.functionalErrors)
      };

    default:
      return state;
  }
}

export interface FunctionalErrorsState {
  displayErrors: boolean;
  functionalErrors: string[];
}
