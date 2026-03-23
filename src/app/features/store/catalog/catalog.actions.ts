import { Action } from '@ngrx/store';
import { CatalogCategory, CatalogItem } from '@shared/interfaces/catalog.interfaces';

export enum CatalogActionTypes {
  LOAD_CATEGORIES              = '[CATALOG] Load categories',
  LOAD_CATEGORIES_SUCCESS      = '[CATALOG] Load categories success',
  LOAD_CATEGORIES_ERROR        = '[CATALOG] Load categories error',
  LOAD_ITEMS_FOR_CATEGORY      = '[CATALOG] Load items for category',
  LOAD_ITEMS_FOR_CATEGORY_SUCCESS = '[CATALOG] Load items for category success',
  LOAD_ITEMS_FOR_CATEGORY_ERROR   = '[CATALOG] Load items for category error',
}

export class CatalogLoadCategories implements Action {
  readonly type = CatalogActionTypes.LOAD_CATEGORIES;
}

export class CatalogLoadCategoriesSuccess implements Action {
  readonly type = CatalogActionTypes.LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: CatalogCategory[]) {}
}

export class CatalogLoadCategoriesError implements Action {
  readonly type = CatalogActionTypes.LOAD_CATEGORIES_ERROR;
  constructor(public payload: { error: any }) {}
}

export class CatalogLoadItemsForCategory implements Action {
  readonly type = CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY;
  constructor(public payload: { categoryId: string }) {}
}

export class CatalogLoadItemsForCategorySuccess implements Action {
  readonly type = CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY_SUCCESS;
  constructor(public payload: { categoryId: string; items: CatalogItem[] }) {}
}

export class CatalogLoadItemsForCategoryError implements Action {
  readonly type = CatalogActionTypes.LOAD_ITEMS_FOR_CATEGORY_ERROR;
  constructor(public payload: { categoryId: string; error: any }) {}
}

export type CatalogActions =
  | CatalogLoadCategories
  | CatalogLoadCategoriesSuccess
  | CatalogLoadCategoriesError
  | CatalogLoadItemsForCategory
  | CatalogLoadItemsForCategorySuccess
  | CatalogLoadItemsForCategoryError;
