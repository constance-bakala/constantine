import {Action} from '@ngrx/store';
import {ILoginSuccess, ISignup} from '@shared/interfaces';
import {HttpErrorResponse} from '@angular/common/http';

export enum AuthActionTypes {

  LOGIN = '[core:auth] Login',
  LOGGED_IN = '[core:auth] Logged in successfully',
  LOGOUT = '[core:auth] Logout',
  LOGGED_OUT = '[core:auth] Logged out successfully',
  SET_IS_ADMIN = '[core:auth] Set isAdmin',
  LOGIN_ERROR = '[core:auth] Login Error',
  AUTH_SIGNUP = '[auth - signup] Signup a new user',
  AUTH_SIGNUP_INIT = '[auth- signup] Init signup state',
  AUTH_SIGNUP_SUCCESS = '[auth- signup] User signed up successfully',
  AUTH_SIGNUP_ERROR = '[auth- signup] Error while signing up a user',
  AUTH_REFRESH_USER_TOKEN = '[auth- user state] check current user state',
  AUTH_REFRESH_USER_TOKEN_SUCCESS = '[auth- user state] checked current user state successfully'
}

export class AuthRefreshUserToken implements Action {
  readonly type = AuthActionTypes.AUTH_REFRESH_USER_TOKEN;
}

export class AuthRefreshUserTokenSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_REFRESH_USER_TOKEN_SUCCESS;

  constructor(public payload: ISignup) {
  }
}

export class AuthSignup implements Action {
  readonly type = AuthActionTypes.AUTH_SIGNUP;

  constructor(public payload: ISignup) {
  }
}

export class AuthSignupSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_SIGNUP_SUCCESS;

  constructor(public payload: ILoginSuccess) {
  }

}

export class AuthSignupError implements Action {
  readonly type = AuthActionTypes.AUTH_SIGNUP_ERROR;

  constructor(public payload: { error: HttpErrorResponse }) {
  }
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

  constructor(public payload: ILoginSuccess) {
  }
}

export class ActionAuthSetError implements Action {
  readonly type = AuthActionTypes.LOGIN_ERROR;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class ActionSetIsAdmin implements Action {
  readonly type = AuthActionTypes.SET_IS_ADMIN;

  constructor(public isAdmin = false) {
  }
}

export type AuthActions =
  | ActionAuthLogin
  | ActionAuthLogout
  | ActionAuthLoggedIn
  | ActionAuthLoggedOut
  | AuthSignup
  | AuthSignupSuccess
  | AuthSignupError
  | AuthRefreshUserToken
  | AuthRefreshUserTokenSuccess;
