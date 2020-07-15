import {Injectable} from '@angular/core';
import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {Observable, of} from 'rxjs';
import {DRESSES_SIZE, EARINGS_SIZE, getAssetItems, MASKS_SIZE} from '@helpers/common.services.utils';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() {
  }

  public findAllFromAssets(category: ItemsCategoriesEnum): Observable<Category> {
    let nbItems = 0;
    let categoryInfos: Category = undefined;
    switch (category) {
      case ItemsCategoriesEnum.EARINGS:
        nbItems = EARINGS_SIZE;
        categoryInfos = {
          name: ItemsCategoriesEnum.EARINGS,
          title: 'PRODUCTS.EARRINGS.TITLE',
          summary: 'PRODUCTS.EARRINGS.DESCRIPTION',
          items: getAssetItems(nbItems, 'jewellery', 'earing', 'png', ItemsCategoriesEnum.EARINGS),
        };
        return of(categoryInfos);
      case ItemsCategoriesEnum.DRESSES:
        nbItems = DRESSES_SIZE;
        categoryInfos = {
          name: ItemsCategoriesEnum.DRESSES,
          title: 'PRODUCTS.DRESSES.TITLE',
          summary: 'PRODUCTS.DRESSES.DESCRIPTION',
          items: getAssetItems(nbItems, 'dresses', 'dress', 'png', ItemsCategoriesEnum.DRESSES),
        };
        return of(categoryInfos);
      case ItemsCategoriesEnum.MASKS:
        nbItems = MASKS_SIZE;

        categoryInfos = {
          name: ItemsCategoriesEnum.MASKS,
          title: 'PRODUCTS.MASKS.TITLE',
          summary: 'PRODUCTS.MASKS.DESCRIPTION',
          items: getAssetItems(nbItems, 'masks', 'mask', 'png', ItemsCategoriesEnum.MASKS)
        };
        return of(categoryInfos);
      default:
        return of({
          name: ItemsCategoriesEnum.UNKNOWN,
          title: 'PRODUCTS.UNKNOWN.TITLE',
          summary: 'PRODUCTS.UNKNOWN.DESCRIPTION',
          items: []
        });
    }
  }
}
