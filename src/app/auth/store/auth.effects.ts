import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {LocalStorageService} from '../../core/local-storage/local-storage.service';

import {CacheService} from '@shared/services/cache/cache.service';

import {
  ActionAuthLoggedIn,
  ActionAuthLoggedOut,
  ActionAuthLogin,
  ActionAuthSetError,
  AUTH_KEY,
  AuthActionTypes,
  selectorAuth
} from './auth.reducer';

import {Go} from './router.actions';
import {AuthService} from '@shared/services';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private service: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private cache: CacheService
  ) {
  }

  @Effect()
  login(): Observable<Action> {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
        switchMap((action: ActionAuthLogin) =>
          this.service
            .login(action.payload.username, action.payload.password)
            .pipe(
              map(data => new ActionAuthLoggedIn(data)),
              catchError(error => of(new ActionAuthSetError(error)))
            )
        )
      );
  }

  @Effect()
  logout(): Observable<Action> {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LOGOUT),
        switchMap(() =>
          this.service
            .logout()
            .pipe(
              map(data => {
                this.localStorageService.clearAll();
                this.cache.clearAll();
                return new ActionAuthLoggedOut();
              }),
              catchError(error => of(new ActionAuthSetError(error)))
            )
        )
      );
  }

  @Effect({ dispatch: false })
  toggleLoggedIn(): Observable<Action> {
    return this.actions$
      .pipe(
        ofType(AuthActionTypes.LOGGED_IN, AuthActionTypes.LOGGED_OUT),
        withLatestFrom(this.store$),
        map(([action, state]: [ActionAuthLogged, any]) => {

          // Empty localStorage if you are about to login or logout.
          this.localStorageService.clearAll();
          this.cache.clearAll();

          if (state) {
            const { error, ...authState } = selectorAuth(state);
            this.localStorageService.setItem(AUTH_KEY, authState);
            if (authState.isAuthenticated) {
              return new Go({
                path: ['/']
              });
            } else if (!/^\/auth/.test(this.router.url)) {
              return new Go({
                path: ['/auth/signin']
              });
            }
          }
        }),
        tap(action => {
          if (action) {
            this.store$.dispatch(action);
          }
        })
      );
  }

}

export type ActionAuthLogged =
  | ActionAuthLoggedIn
  | ActionAuthLoggedOut;
