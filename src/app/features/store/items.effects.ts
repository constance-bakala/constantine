import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {ItemsService} from '@app/features/items.service';
import {
  ActionItemsRetrieve,
  ActionItemsRetrieveError,
  ActionItemsRetrieveSuccess,
  ActionItemToogleSelect,
  ActionItemToogleSelectSuccess,
  ActionUpdateBasketItem,
  ItemsActionTypes,
} from '@app/features/store/items.actions';
import {Category, ItemInfos} from '@shared/interfaces';
import {selectChosenItems} from '@app/features/store/items.selectors';

const BASKET_STORAGE_KEY = 'delice-basket';

interface BasketSavedEntry {
  reference: string;
  category: string;
  index: number;
  selected: boolean;
  basketInfos: { selectedQuantity: number; selectedSize: string; selectedModel: string };
}

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private itemsService: ItemsService,
    private store: Store<any>
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

  // Sauvegarde le panier dans localStorage après chaque sélection ou mise à jour.
  // On utilise switchMap + take(1) pour lire l'état APRÈS que le reducer a traité l'action,
  // ce que withLatestFrom ne garantit pas quand l'item vient d'être nouvellement sélectionné.
  saveBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.TOOGLE_SELECT_ITEM_SUCCESS, ItemsActionTypes.UPDATE_BASKET_ITEM),
      switchMap(() => this.store.pipe(
        select(selectChosenItems),
        take(1)
      )),
      tap((selectedItems: ItemInfos[]) => {
        const toSave: BasketSavedEntry[] = selectedItems.map(item => ({
          reference: item.reference,
          category: item.category,
          index: item.index,
          selected: true,
          basketInfos: {
            selectedQuantity: item.basketInfos?.selectedQuantity ?? 1,
            selectedSize: item.basketInfos?.selectedSize ?? 'M',
            selectedModel: item.basketInfos?.selectedModel ?? 'MODEL_UNIQUE',
          },
        }));
        localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(toSave));
      })
    ),
    {dispatch: false}
  );

  // Restaure le panier depuis localStorage après le chargement d'une catégorie
  restoreBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS),
      mergeMap((action: ActionItemsRetrieveSuccess) => {
        const savedRaw = localStorage.getItem(BASKET_STORAGE_KEY);
        if (!savedRaw) return [];
        let saved: BasketSavedEntry[];
        try {
          saved = JSON.parse(savedRaw);
        } catch {
          return [];
        }
        return saved
          .filter(entry => entry.category === action.payload.name)
          .map(entry => new ActionUpdateBasketItem(entry as any));
      })
    )
  );
}
