import {Injectable} from '@angular/core';
import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {Observable, of} from 'rxjs';
import {getAssetItems} from '@helpers/common.services.utils';

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
        nbItems = 17;
        categoryInfos = {
          name: ItemsCategoriesEnum.EARINGS,
          title: 'Boubles d\'oreilles',
          summary: 'Les boucles d\'oreilles ci-dessous représentent un échantillon de nos créations. Si vous avez une idée précise de ce que vous souhaitez n\'hésitez pas à nous contacter!',
          items: getAssetItems(nbItems, 'jewellery', 'earing', 'png', ItemsCategoriesEnum.EARINGS),
        };
        return of(categoryInfos);
      case ItemsCategoriesEnum.DRESSES:
        nbItems = 48;
        categoryInfos = {
          name: ItemsCategoriesEnum.DRESSES,
          title: 'Vêtements',
          summary: 'Les robes ci-dessous représentent un échantillon de nos créations. Nous pouvons également vous fournir vos créations sur mesure !',
          items: getAssetItems(nbItems, 'dresses', 'dress', 'png', ItemsCategoriesEnum.DRESSES),
        };
        return of(categoryInfos);
      case ItemsCategoriesEnum.MASKS:
        nbItems = 62;

        categoryInfos = {
          name: ItemsCategoriesEnum.MASKS,
          title: 'Masques',
          summary: 'Les masques ci-dessous représentent un échantillon de nos créations. Nous suivons les recommandations de l\'organisme français AFNOR pour produire des masques en tissus pour adulte et enfants de plus de 7 ans ! ' +
            'Ces masques grand public visent à protéger la population saine, en complément des indispensables gestes barrières face au coronavirus.',
          items: getAssetItems(nbItems, 'masks', 'mask', 'png', ItemsCategoriesEnum.MASKS)
        };
        return of(categoryInfos);
      default:
        return of({
          name: ItemsCategoriesEnum.UNKNOWN,
          title: 'Unknown',
          summary: 'Ce produit n\'est pas encore connu dans nos référentiels, veuillez contacter votre administrateur',
          items: []
        });
    }
  }
}
