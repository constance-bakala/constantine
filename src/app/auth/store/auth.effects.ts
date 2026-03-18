import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {from, of} from 'rxjs';
import {catchError, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

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
import {selectorConnectedUser} from '@app/auth/store/auth.selectors';
import {AUTH_KEY} from '@app/auth/store/auth.reducer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {ItemInfos} from '@shared/interfaces';
import {ActionItemToogleNotSelected, ActionUpdateBasketItem} from '@app/features/store';

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
    {dispatch: false}
  );

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
    {dispatch: false}
  );

  toggleLoggedIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGGED_IN),
      withLatestFrom(this.store$),
      map(([action, state]: [ActionAuthLogged, any]) => {
        // (techniquement action ne devrait jamais être falsy ici, mais on garde ta sécurité)
        if (!action) {
          return new Go({path: ['/']});
        }

        if (state && !!state['core:auth:constantine']) {
          this.localStorageService.setItem(AUTH_KEY, action.payload);
          const authState = selectorConnectedUser(state);

          if (/^\/auth/.test(this.router.url)) {
            return new Go({path: ['/']});
          } else if (!!authState) {
            return null;
          }
        }

        return null;
      }),
      // ✅ IMPORTANT: ne laisse passer que de vraies actions
      filter((a): a is NonNullable<typeof a> => a != null)
    )
  );

  restoreBasketOnLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGGED_IN),
        switchMap((action: ActionAuthLoggedIn) => {
          const uid = action.payload?.additionalInfos?.uid;
          if (!uid) return of(null);
          // Efface les données stale de localStorage avant la réponse Firebase
          // pour que restoreBasket$ ne dispatche pas d'anciens items
          localStorage.removeItem('delice-basket');
          return from(firebase.database().ref(`users/${uid}/basket`).once('value')).pipe(
            switchMap((snap) => {
              const val = snap.val();
              if (!val) return of(null);
              const rawItems: any[] = Array.isArray(val) ? val : Object.values(val);
              const items = rawItems.filter(Boolean);
              if (!items.length) return of(null);
              localStorage.setItem('delice-basket', JSON.stringify(items));
              // Attend que les 3 catégories soient chargées dans le store avant de dispatcher
              return this.store$.pipe(
                select((state: any) =>
                  (state.constantine?.earings?.items?.length ?? 0) > 0 &&
                  (state.constantine?.dresses?.items?.length ?? 0) > 0 &&
                  (state.constantine?.masks?.items?.length ?? 0) > 0
                ),
                filter((allLoaded) => !!allLoaded),
                take(1),
                tap(() => items.forEach((item) => this.store$.dispatch(new ActionUpdateBasketItem(item))))
              );
            }),
            catchError((e) => {
              console.error('[basket restore on login]', e);
              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );
}

export type ActionAuthLogged = ActionAuthLoggedIn;
