import {Injectable} from '@angular/core';
import {ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {Observable, of} from 'rxjs';
import {getAssetItems} from '@helpers/common.services.utils';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() {
  }

  public findAllFromAssets(category: ItemsCategoriesEnum): Observable<ItemInfos[]> {
    let nbItems = 0;
    switch (category) {
      case ItemsCategoriesEnum.EARINGS:
        nbItems = 17;
        return of(getAssetItems(nbItems, 'jewellery', 'earing', 'png', ItemsCategoriesEnum.EARINGS));
      case ItemsCategoriesEnum.DRESSES:
        nbItems = 29;
          return of(getAssetItems(nbItems, 'dresses', 'dress', 'png', ItemsCategoriesEnum.DRESSES));
      case ItemsCategoriesEnum.MASKS:
        nbItems = 62;
            return of(getAssetItems(nbItems, 'masks', 'mask', 'png', ItemsCategoriesEnum.MASKS));
      default:
        return of([]);
    }
  }
}
