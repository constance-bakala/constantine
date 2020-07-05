import {HttpErrorResponse} from '@angular/common/http';
import {ILoginSuccess} from '@shared/interfaces';
import {AuthActions, AuthActionTypes} from '@app/auth/store/auth.actions';

export const AUTH_KEY = 'CORE:AUTH:CONSTANTINE';


export interface AuthState {
  error?: HttpErrorResponse;
  loading: boolean;
  user?: ILoginSuccess;
}

export const authInitialState: AuthState = {
  loading: false,
  user: undefined,
  error: undefined
}
;

export function authReducer(state: AuthState = authInitialState,
                            action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.AUTH_SIGNUP:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionTypes.AUTH_SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case AuthActionTypes.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload
      };
    case AuthActionTypes.LOGGED_IN:
      return {
        error: undefined,
        loading: false,
        user: action.payload,
      };
    case AuthActionTypes.LOGIN:
      return {
        ...authInitialState,
        loading: true,
        error: undefined
      };
    case AuthActionTypes.LOGOUT:
      return authInitialState;
    case AuthActionTypes.LOGGED_OUT:
      return {
        ...state,
        loading: false
      };
    case AuthActionTypes.AUTH_REFRESH_USER_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

/**
 * Method used for clearing state/reset store on logout
 * @param reducer
 */
export function clearState(reducer) {
  return function (state, action) {
    if (action.type === AuthActionTypes.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

