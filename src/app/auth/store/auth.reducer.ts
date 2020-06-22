import {createSelector} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ILoginSuccess} from '@shared/interfaces';
import {AuthActions, AuthActionTypes} from '@app/auth/store/auth.actions';

export const AUTH_KEY = 'CORE:AUTH:CONSTANTINE';


export interface AuthState {
  isAuthenticated: boolean;
  isAdmin?: boolean;
  error?: HttpErrorResponse;
  token?: string;
  loading: boolean;
  user?: ILoginSuccess;
  other?: any;
}

export const authInitialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  isAdmin: false
};

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
        error: null
      };
    case AuthActionTypes.LOGGED_IN:
      return {
        ...state,
        isAuthenticated: !!action.payload?.token,
        isAdmin: false,
        error: undefined,
        token: action.payload?.token,
        loading: false,
        user: action.payload,
      };
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        loading: true
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        token: undefined,
        loading: true,
        user: undefined
      };
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

