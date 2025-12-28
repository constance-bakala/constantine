import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ItemsService} from '@app/features/items.service';
import {
  ActionItemsRetrieve,
  ActionItemsRetrieveError,
  ActionItemsRetrieveSuccess,
  ActionItemToogleSelect,
  ActionItemToogleSelectSuccess,
  ItemsActionTypes,
} from '@app/features/store/items.actions';
import {Category} from "@shared/interfaces";

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private itemsService: ItemsService
  ) {
  }

  retriveAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.RETRIEVE_ITEMS),
      switchMap((action: ActionItemsRetrieve) =>
        this.itemsService.findAllFromAssets(action.payload.category).pipe(
          map((response: Category) => new ActionItemsRetrieveSuccess(response)),
          catchError((error) => of(new ActionItemsRetrieveError({error})))
        )
      )
    )
  );

  toogleSelectOneItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.TOOGLE_SELECT_ITEM),
      map((action: ActionItemToogleSelect) => new ActionItemToogleSelectSuccess(action.payload))
    )
  );
}
