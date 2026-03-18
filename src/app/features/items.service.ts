import { Injectable } from '@angular/core';
import { Category, ItemsCategoriesEnum } from '@shared/interfaces';
import { Observable, of } from 'rxjs';
import { getAssetGroups } from '@helpers/common.services.utils';
import { DRESS_GROUPS, EARING_GROUPS, MASK_GROUPS } from '@helpers/items-groups.const';
import { ITEMS_PRICES } from '@helpers/items-prices.const';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  public findAllFromAssets(category: ItemsCategoriesEnum): Observable<Category> {
    switch (category) {
      case ItemsCategoriesEnum.EARINGS:
        return of({
          name: ItemsCategoriesEnum.EARINGS,
          title: 'PRODUCTS.EARRINGS.TITLE',
          summary: 'PRODUCTS.EARRINGS.DESCRIPTION',
          items: getAssetGroups(EARING_GROUPS, 'jewellery', 'earing', ItemsCategoriesEnum.EARINGS, ITEMS_PRICES.earings),
        });
      case ItemsCategoriesEnum.DRESSES:
        return of({
          name: ItemsCategoriesEnum.DRESSES,
          title: 'PRODUCTS.DRESSES.TITLE',
          summary: 'PRODUCTS.DRESSES.DESCRIPTION',
          items: getAssetGroups(DRESS_GROUPS, 'dresses', 'dress', ItemsCategoriesEnum.DRESSES, ITEMS_PRICES.dresses),
        });
      case ItemsCategoriesEnum.MASKS:
        return of({
          name: ItemsCategoriesEnum.MASKS,
          title: 'PRODUCTS.MASKS.TITLE',
          summary: 'PRODUCTS.MASKS.DESCRIPTION',
          items: getAssetGroups(MASK_GROUPS, 'masks', 'mask', ItemsCategoriesEnum.MASKS, ITEMS_PRICES.masks),
        });
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
