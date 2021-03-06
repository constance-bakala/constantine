import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import * as RouterActions from './router.actions';
import {Store} from '@ngrx/store';
import {ActionHideFunctionalErrors} from '@app/auth/store/errors.reducer';

@Injectable()
export class RouterEffects {
  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType(RouterActions.GO),
    map((action: RouterActions.Go) => action.payload),
    map((payload) => {
      this.store.dispatch(new ActionHideFunctionalErrors());
      return payload;
    }),
    tap(({path, query: queryParams, extras}) => {
        this.router.navigate(path, {
          queryParams,
          ...extras
        });
      }
    ),

  );

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.pipe(
    ofType(RouterActions.BACK),
        tap(() => this.location.back())
  );

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.pipe(
    ofType(RouterActions.FORWARD),
    tap(() => this.location.forward())
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<any>
  ) {
  }
}
