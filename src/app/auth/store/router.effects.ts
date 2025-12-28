import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as RouterActions from './router.actions';
import { Store } from '@ngrx/store';
import { ActionHideFunctionalErrors } from '@app/auth/store/errors.reducer';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.GO),
        map((action: RouterActions.Go) => action.payload),
        tap(() => {
          this.store.dispatch(new ActionHideFunctionalErrors());
        }),
        tap(({ path, query: queryParams, extras }) => {
          this.router.navigate(path, {
            queryParams,
            ...extras,
          });
        })
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.BACK),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.FORWARD),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<any>
  ) {}
}
