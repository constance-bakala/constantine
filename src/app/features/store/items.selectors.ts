import { Category, CategoryInfos, ItemInfos, ItemsState } from '@shared/interfaces';
import { createSelector } from '@ngrx/store';

export function selectItemsState(state: any): ItemsState {
  return state.constantine;
}

export const selectNbChosenItems = createSelector(
  selectItemsState,
  (state: ItemsState) => {
    return Object.values(state.categories)
      .flatMap(cat => cat.items.filter(item => item.selected))
      .reduce((sum, item) => sum + (item.basketInfos?.selectedQuantity ?? 1), 0);
  }
);

export const selectChosenItems = createSelector(
  selectItemsState,
  (state: ItemsState): ItemInfos[] => {
    return Object.values(state.categories)
      .flatMap(cat => cat.items.filter(item => item.selected));
  }
);

export const selectExistingCategory = createSelector(
  selectItemsState,
  (state: ItemsState): Record<string, CategoryInfos> => {
    return Object.fromEntries(
      Object.entries(state.categories).map(([key, cat]) => [
        key,
        { name: cat.name, title: cat.title } as CategoryInfos
      ])
    );
  }
);
