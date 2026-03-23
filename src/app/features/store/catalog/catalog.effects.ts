import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { CatalogRepository } from '@app/core/firebase/catalog.repository';
import {
  CatalogActionTypes,
  CatalogLoadCategoriesError,
  CatalogLoadCategoriesSuccess,
  CatalogLoadItemsForCategory,
  CatalogLoadItemsForCategoryError,
  CatalogLoadItemsForCategorySuccess,
} from './catalog.actions';

@Injectable()
export class CatalogEffects {

  constructor(
    private actions$: Actions,
    private catalogRepository: CatalogRepository,
  ) {}

  /**
   * Souscription temps réel aux catégories Firebase dès l'enregistrement de l'effet.
   * defer() garantit que la souscription se fait après l'initialisation NgRx,
   * évitant la race condition de of(action) synchrone.
   */
  loadCategories$ = createEffect(() =>
    defer(() => {
      console.log('[CatalogEffects] démarrage watchCategories');
      return this.catalogRepository.watchCategories().pipe(
        tap(cats => console.log('[CatalogEffects] catégories reçues:', cats.length, cats)),
        map((categories) => new CatalogLoadCategoriesSuccess(categories)),
        catchError((error) => {
          console.error('[CatalogEffects] erreur watchCategories:', error);
          return of(new CatalogLoadCategoriesError({ error }));
        })
      );
    })
  );

  loadItemsForCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY),
      mergeMap((action: CatalogLoadItemsForCategory) =>
        this.catalogRepository.watchPublishedItemsByCategory(action.payload.categoryId).pipe(
          map((items) =>
            new CatalogLoadItemsForCategorySuccess({
              categoryId: action.payload.categoryId,
              items,
            })
          ),
          catchError((error) =>
            of(new CatalogLoadItemsForCategoryError({ categoryId: action.payload.categoryId, error }))
          )
        )
      )
    )
  );
}
