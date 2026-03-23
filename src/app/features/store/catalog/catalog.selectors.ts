import { createSelector } from '@ngrx/store';
import { CatalogState } from '@shared/interfaces/catalog.interfaces';

export function selectCatalogState(state: any): CatalogState {
  return state.catalog;
}

export const selectAllCategories = createSelector(
  selectCatalogState,
  (catalog) => catalog.categories
);

export const selectPublishedCategories = createSelector(
  selectAllCategories,
  (categories) => categories.filter((c) => c.published)
);

export const selectCatalogLoaded = createSelector(
  selectCatalogState,
  (catalog) => catalog.loaded
);

export const selectCatalogLoading = createSelector(
  selectCatalogState,
  (catalog) => catalog.loading
);

export const selectItemsByCategory = (categoryId: string) =>
  createSelector(
    selectCatalogState,
    (catalog) => catalog.itemsByCategory[categoryId] ?? []
  );

/** Retourne true si le catalog Firebase contient au moins un item publié pour cette catégorie. */
export const selectHasCatalogItemsFor = (categoryId: string) =>
  createSelector(
    selectCatalogState,
    (catalog) => (catalog.itemsByCategory[categoryId]?.length ?? 0) > 0
  );
