import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {ILoginSuccess} from '@shared/interfaces';

export const AUTH_KEY = 'CORE:AUTH';

export enum AuthActionTypes {
  LOGIN = '[core:auth] Login',
  LOGGED_IN = '[core:auth] Logged in successfully',
  LOGOUT = '[core:auth] Logout',
  LOGGED_OUT = '[core:auth] Logged out successfully',
  SET_IS_ADMIN = '[core:auth] Set isAdmin',
  LOGIN_ERROR = '[core:auth] Login Error',
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(
    public payload: {
      username: string;
      password: string;
    }
  ) {
  }
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ActionAuthLoggedOut implements Action {
  readonly type = AuthActionTypes.LOGGED_OUT;
}

export class ActionAuthLoggedIn implements Action {
  readonly type = AuthActionTypes.LOGGED_IN;
  constructor(public payload: ILoginSuccess) {}
}

export class ActionAuthSetError implements Action {
  readonly type = AuthActionTypes.LOGIN_ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export class ActionSetIsAdmin implements Action {
  readonly type = AuthActionTypes.SET_IS_ADMIN;
  constructor(public isAdmin = false) {}
}

export type AuthActions =
  | ActionAuthLogin
  | ActionAuthLogout
  | ActionAuthLoggedIn
  | ActionAuthLoggedOut;

export const authInitialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  isAdmin: false
};

export const selectorAuth = (state): AuthState => state['core:auth'];

export function authReducer(state: AuthState = authInitialState,
                            action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGGED_IN:
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        loading: true
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null
      };
    case AuthActionTypes.LOGGED_OUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: null,
        user: null,
        isAdmin: false
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

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin?: boolean;
  error?: HttpErrorResponse;
  token?: string;
  loading: boolean;
  user?: ILoginSuccess;
}
