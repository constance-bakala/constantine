import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ItemsService} from '@app/features/items.service';
import {
  ActionItemsRetrieve,
  ActionItemsRetrieveError,
  ActionItemsRetrieveSuccess,
  ActionItemToogleSelect,
  ActionItemToogleSelectSuccess,
  ItemsActionTypes
} from '@app/features/store/items.actions';
import {ActionBasketToogleItem} from '@app/features/basket/store';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions,
              private store$: Store<any>,
              private itemsService: ItemsService) {
  }

  @Effect()
  retriveAll(): Observable<Action> {
    return this.actions$
      .pipe(
        ofType(ItemsActionTypes.RETRIEVE_ITEMS),
        switchMap((action: ActionItemsRetrieve) =>
          this.itemsService
            .findAllFromAssets(action.payload.category)
            .pipe(
              map(response => new ActionItemsRetrieveSuccess(response)),
              catchError(error =>
                of(new ActionItemsRetrieveError({error}))
              )
            )
        )
      );
  }

  @Effect()
  toogleSelectOneItem(): Observable<Action> {
    return this.actions$
      .pipe(
        ofType(ItemsActionTypes.TOOGLE_SELECT_ITEM),
        map((action: ActionItemToogleSelect) => {
          this.store$.dispatch(new ActionBasketToogleItem(action.payload));
          return new ActionItemToogleSelectSuccess(action.payload);
        })
      );
  }
}
