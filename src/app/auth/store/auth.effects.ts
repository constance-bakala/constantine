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
  ActionAuthLogout,
  ActionAuthSetError,
  AuthActionTypes,
} from './auth.actions';

import {Go} from './router.actions';
import {AuthService} from '@shared/services';
import {selectorAuth} from '@app/auth/store/auth.selectors';
import {AUTH_KEY} from '@app/auth/store/auth.reducer';

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
  logout(): Observable<Action> {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LOGOUT),
      map((action: ActionAuthLogout) => {
        this.localStorageService.setItem(AUTH_KEY, {});
        this.localStorageService.clearAll();
        this.cache.clearAll();
        return new ActionAuthLoggedOut();
      }),
      catchError(error => of(new ActionAuthSetError(error)))
    );
  }

  @Effect({
    dispatch: false
  })
  refrechUserToken(): Observable<any> {
    return this.actions$
      .pipe(
        ofType(AuthActionTypes.AUTH_REFRESH_USER_TOKEN),
        map((action: ActionAuthLogged) => {
          // Empty localStorage if you are about to login or logout.
          const currentUser = this.localStorageService.getItem(AUTH_KEY);
          this.store$.dispatch(new ActionAuthLoggedIn(currentUser));
        })
      );
  }

  @Effect({dispatch: false})
  toggleLoggedIn(): Observable<Action> {
    return this.actions$
      .pipe(
        ofType(AuthActionTypes.LOGGED_IN),
        withLatestFrom(this.store$),
        map(([action, state]: [ActionAuthLogged, any]) => {
          // Empty localStorage if you are about to login or logout.
          if(!action) {
            return new Go({
              path: ['/']
            });
          }
          if (state) {
            const {error, ...authState} = selectorAuth(state);
            this.localStorageService.setItem(AUTH_KEY, action.payload);
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
  | ActionAuthLoggedIn;
