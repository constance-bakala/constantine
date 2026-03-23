import { CatalogState } from '@shared/interfaces/catalog.interfaces';
import { CatalogActions, CatalogActionTypes } from './catalog.actions';

const initialState: CatalogState = {
  categories: [],
  itemsByCategory: {},
  loading: false,
  loaded: false,
};

export function catalogReducer(
  state: CatalogState = initialState,
  action: CatalogActions
): CatalogState {
  switch (action.type) {
    case CatalogActionTypes.LOAD_CATEGORIES:
      return { ...state, loading: true };

    case CatalogActionTypes.LOAD_CATEGORIES_SUCCESS:
      return { ...state, loading: false, loaded: true, categories: action.payload };

    case CatalogActionTypes.LOAD_CATEGORIES_ERROR:
      return { ...state, loading: false };

    case CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        itemsByCategory: {
          ...state.itemsByCategory,
          [action.payload.categoryId]: action.payload.items,
        },
      };

    default:
      return state;
  }
}
