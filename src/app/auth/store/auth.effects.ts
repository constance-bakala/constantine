import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BehaviorSubject, EMPTY, of} from 'rxjs';
import {catchError, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {Currency} from '@shared/interfaces';
import {PricingService} from '@shared/services/pricing.service';

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
import {ItemInfos} from '@shared/interfaces';
import {ActionItemToogleNotSelected, ActionUpdateBasketItem, ItemsActionTypes} from '@app/features/store';
import {UsersRepository} from '@app/core/firebase/users.repository';
import {CatalogActionTypes} from '@app/features/store/catalog/catalog.actions';

@Injectable()
export class AuthEffects {

  /** Prefixes publiés reçus via CatalogLoadCategoriesSuccess */
  private readonly expectedCategories = new Set<string>();
  /** Prefixes ayant reçu RETRIEVE_ITEMS_SUCCESS */
  private readonly loadedCategories = new Set<string>();
  private readonly allCategoriesLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private service: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private cache: CacheService,
    private usersRepository: UsersRepository,
    private translate: TranslateService,
    private pricing: PricingService,
  ) {
    // Écoute les catégories publiées pour connaître le nombre attendu
    this.actions$.pipe(
      ofType(CatalogActionTypes.LOAD_CATEGORIES_SUCCESS),
    ).subscribe((action: any) => {
      action.payload
        .filter((c: any) => c.published)
        .forEach((c: any) => this.expectedCategories.add(c.prefix));
      this.checkAllLoaded();
    });

    // Écoute les RETRIEVE_ITEMS_SUCCESS pour compter les catégories chargées
    this.actions$.pipe(
      ofType(ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS),
    ).subscribe((action: any) => {
      this.loadedCategories.add(action.payload.name);
      this.checkAllLoaded();
    });
  }

  private checkAllLoaded(): void {
    if (
      this.expectedCategories.size > 0 &&
      [...this.expectedCategories].every(prefix => this.loadedCategories.has(prefix))
    ) {
      this.allCategoriesLoaded$.next(true);
    }
  }

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGOUT),
      map((action: ActionAuthLogout) => {
        this.localStorageService.setItem(AUTH_KEY, undefined);
        this.localStorageService.clearAll();
        localStorage.removeItem('delice-basket');
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
        switchMap(() => {
          const currentUser = this.localStorageService.getItem(AUTH_KEY);
          if (!currentUser) return EMPTY;
          this.store$.dispatch(new ActionAuthLoggedIn(currentUser));
          return this.usersRepository.watchCommands(currentUser.uid).pipe(
            tap(items => items.forEach(item => this.store$.dispatch(new ActionItemToogleNotSelected(item))))
          );
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

  restorePreferencesOnLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGGED_IN),
        switchMap((action: ActionAuthLoggedIn) => {
          const uid = action.payload?.additionalInfos?.uid;
          if (!uid) return of(null);
          return this.usersRepository.getPreferences(uid).pipe(
            tap((prefs) => {
              if (!prefs) return;
              if (prefs.lang && ['fr', 'en'].includes(prefs.lang)) {
                this.translate.use(prefs.lang);
                localStorage.setItem('lang', prefs.lang);
              }
              if (prefs.currency && ['EUR', 'XAF'].includes(prefs.currency)) {
                this.pricing.setCurrency(prefs.currency as Currency);
              }
            }),
            catchError(() => of(null))
          );
        })
      ),
    { dispatch: false }
  );

  restoreBasketOnLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGGED_IN),
        switchMap((action: ActionAuthLoggedIn) => {
          const uid = action.payload?.additionalInfos?.uid;
          if (!uid) return of(null);
          // Ne pas restaurer seulement si TOUTES les commandes existantes sont expédiées
          return this.usersRepository.getOrderStatus(uid).pipe(
            switchMap((statusVal) => {
              const orders = statusVal ? Object.values(statusVal) : [];
              // Firebase est source de vérité UNIQUEMENT s'il y a une commande active (non expédiée).
              // Pas de commande active → on garde le panier localStorage tel quel.
              const hasActiveOrder = orders.some((o: any) => o?.status !== 'shipped');
              if (!hasActiveOrder) return of(null);
              return this.usersRepository.getBasket(uid).pipe(
                switchMap((items) => {
                  if (!items?.length) return of(null);
                  // Attend que les 3 catégories soient chargées.
                  // allCategoriesLoaded$ est un BehaviorSubject alimenté depuis le
                  // constructeur → émet true immédiatement si déjà chargées, sinon attend.
                  return this.allCategoriesLoaded$.pipe(
                    filter(loaded => loaded),
                    take(1),
                    tap(() => items.forEach((item) => this.store$.dispatch(new ActionUpdateBasketItem(item))))
                  );
                })
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
