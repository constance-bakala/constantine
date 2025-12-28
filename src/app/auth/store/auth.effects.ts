import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../core/local-storage/local-storage.service';
import { CacheService } from '@shared/services/cache/cache.service';

import {
  ActionAuthLoggedIn,
  ActionAuthLoggedOut,
  ActionAuthLogout,
  ActionAuthSetError,
  AuthActionTypes,
} from './auth.actions';

import { Go } from './router.actions';
import { AuthService } from '@shared/services';
import { selectorConnectedUser } from '@app/auth/store/auth.selectors';
import { AUTH_KEY } from '@app/auth/store/auth.reducer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ItemInfos } from '@shared/interfaces';
import { ActionItemToogleNotSelected } from '@app/features/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private service: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private cache: CacheService
  ) {}

  // Was: @Effect() logout(): Observable<Action>
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGOUT),
      map((action: ActionAuthLogout) => {
        this.localStorageService.setItem(AUTH_KEY, undefined);
        this.localStorageService.clearAll();
        // this.cache.clearAll();
        return new ActionAuthLoggedOut();
      }),
      catchError((error) => of(new ActionAuthSetError(error)))
    )
  );

  // Was: @Effect({dispatch:false}) loggedOut()
  loggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGGED_OUT),
        tap(() => {
          this.store$.dispatch(
            new Go({
              path: ['/'],
            })
          );
        })
      ),
    { dispatch: false }
  );

  // Was: @Effect({dispatch:false}) refrechUserToken()
  refrechUserToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.AUTH_REFRESH_USER_TOKEN),
        tap(() => {
          const currentUser = this.localStorageService.getItem(AUTH_KEY);

          if (currentUser) {
            this.store$.dispatch(new ActionAuthLoggedIn(currentUser));

            firebase
              .database()
              .ref(`users/${currentUser.uid}/commends`)
              .on('value', (snap) => {
                if (snap.val()) {
                  (Object.values(snap.val())[0] as ItemInfos[]).forEach((item) => {
                    this.store$.dispatch(new ActionItemToogleNotSelected(item));
                  });
                }
              });
          } else {
            // this.store$.dispatch(new ActionAuthLogout());
          }
        })
      ),
    { dispatch: false }
  );

  // Was: @Effect({dispatch:false}) toggleLoggedIn()
  toggleLoggedIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGGED_IN),
      withLatestFrom(this.store$),
      map(([action, state]: [ActionAuthLogged, any]) => {
        if (!action) {
          return new Go({ path: ['/'] });
        }

        if (state && !!state['core:auth:constantine']) {
          this.localStorageService.setItem(AUTH_KEY, action.payload);
          const authState = selectorConnectedUser(state);

          if (/^\/auth/.test(this.router.url)) {
            return new Go({ path: ['/'] });
          } else if (!!authState) {
            return null;
          }
        }

        return null;
      })
    )
  );
}

export type ActionAuthLogged = ActionAuthLoggedIn;
