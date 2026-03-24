import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, debounceTime, map, mergeMap, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {
  ActionItemsRetrieve,
  ActionItemsRetrieveError,
  ActionItemsRetrieveSuccess,
  ActionItemToogleSelect,
  ActionItemToogleSelectSuccess,
  ActionRestoreBasketItem,
  ActionUpdateBasketItem,
  ItemsActionTypes,
} from '@app/features/store/items.actions';
import {Category, ItemInfos, ItemSizeEnum} from '@shared/interfaces';
import {selectChosenItems} from '@app/features/store/items.selectors';
import {selectorConnectedUser} from '@app/auth/store/auth.selectors';
import {CatalogRepository} from '@app/core/firebase/catalog.repository';
import {CatalogCategory, CatalogItem} from '@shared/interfaces/catalog.interfaces';
import {UsersRepository} from '@app/core/firebase/users.repository';
import {AuthActionTypes} from '@app/auth/store/auth.actions';
import {CatalogActionTypes, CatalogLoadCategoriesSuccess} from '@app/features/store/catalog/catalog.actions';

const EUR_TO_XAF = 655.96;

function catalogItemsToCategory(
  categoryMeta: CatalogCategory,
  items: CatalogItem[],
  prefix: string
): Category {
  return {
    name:      prefix,
    title:     categoryMeta.title,
    summary:   categoryMeta.description   ?? '',
    summaryEn: categoryMeta.descriptionEn ?? '',
    items: items.map((item, index) => new ItemInfos(
      item.coverUrl,
      false,
      item.reference,
      index,
      prefix,
      false,
      { selectedQuantity: 1, selectedSize: ItemSizeEnum.M, selectedModel: 'MODEL_UNIQUE' },
      item.images?.length ? item.images : [item.coverUrl],
      Math.round((item.priceXAF / EUR_TO_XAF) * 100) / 100
    )),
  };
}

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
  private initialBasket: BasketSavedEntry[];

  constructor(
    private actions$: Actions,
    private catalogRepository: CatalogRepository,
    private store: Store<any>,
    private usersRepository: UsersRepository,
  ) {
    if (localStorage.getItem('basketCleared')) {
      localStorage.removeItem('basketCleared');
      localStorage.removeItem(BASKET_STORAGE_KEY);
      this.initialBasket = [];
    } else {
      const savedRaw = localStorage.getItem(BASKET_STORAGE_KEY);
      try {
        this.initialBasket = savedRaw ? JSON.parse(savedRaw) : [];
      } catch {
        this.initialBasket = [];
      }
    }
  }

  // Quand le catalogue charge ses catégories, on dispatch ActionItemsRetrieve pour chacune.
  loadAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CatalogActionTypes.LOAD_CATEGORIES_SUCCESS),
      mergeMap((action: CatalogLoadCategoriesSuccess) =>
        action.payload
          .filter(cat => cat.published)
          .map(cat => new ActionItemsRetrieve({ category: cat.prefix }))
      )
    )
  );

  retriveAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.RETRIEVE_ITEMS),
      mergeMap((action: ActionItemsRetrieve) => {
        const prefix = action.payload.category;

        return this.catalogRepository.watchPublishedItemsByCategory(prefix).pipe(
          take(1),
          switchMap((items) =>
            this.catalogRepository.getCategoryOnce(prefix).pipe(
              map((categoryMeta) => {
                const meta: CatalogCategory = categoryMeta ?? {
                  prefix, title: prefix, published: true, createdAt: 0,
                };
                return new ActionItemsRetrieveSuccess(
                  catalogItemsToCategory(meta, items, prefix)
                );
              }),
              catchError((error) => of(new ActionItemsRetrieveError({ error })))
            )
          ),
          catchError((error) => of(new ActionItemsRetrieveError({ error })))
        );
      })
    )
  );

  toogleSelectOneItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.TOOGLE_SELECT_ITEM),
      map((action: ActionItemToogleSelect) => new ActionItemToogleSelectSuccess(action.payload))
    )
  );

  saveBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.TOOGLE_SELECT_ITEM_SUCCESS, ItemsActionTypes.UPDATE_BASKET_ITEM),
      debounceTime(300),
      switchMap(() => this.store.pipe(select(selectChosenItems), take(1))),
      withLatestFrom(this.store.pipe(select(selectorConnectedUser))),
      tap(([selectedItems, connectedUser]: [ItemInfos[], any]) => {
        const uid: string | undefined = connectedUser?.additionalInfos?.uid;
        if (selectedItems.length === 0) {
          localStorage.removeItem(BASKET_STORAGE_KEY);
          this.initialBasket = [];
          if (uid) this.usersRepository.saveBasket(uid, [])
            .catch((e: any) => console.error('[basket clear firebase]', e));
          return;
        }
        const toSave: BasketSavedEntry[] = selectedItems.map(item => ({
          reference: item.reference,
          category: item.category,
          index: item.index,
          selected: true,
          basketInfos: {
            selectedQuantity: Math.max(1, item.basketInfos?.selectedQuantity ?? 1),
            selectedSize: item.basketInfos?.selectedSize ?? 'M',
            selectedModel: item.basketInfos?.selectedModel ?? 'MODEL_UNIQUE',
          },
        }));
        localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(toSave));
        this.initialBasket = toSave;
        if (uid) this.usersRepository.saveBasket(uid, toSave)
          .catch((e: any) => console.error('[basket save firebase]', e));
      })
    ),
    {dispatch: false}
  );

  restoreBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActionTypes.RETRIEVE_ITEMS_SUCCESS),
      mergeMap((action: ActionItemsRetrieveSuccess) => {
        return this.initialBasket
          .filter(entry => entry.category === action.payload.name)
          .map(entry => new ActionRestoreBasketItem(entry as any));
      })
    )
  );

  clearBasketOnLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => {
          this.initialBasket = [];
        })
      ),
    { dispatch: false }
  );
}
