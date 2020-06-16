import {ItemInfos, ItemsCategoriesEnum, ItemSizeEnum} from '@shared/interfaces';

export function getAssetItems(size: number, directoryName: string, refPrefix: string, extension, category: ItemsCategoriesEnum): ItemInfos[] {
  return Array(size).fill(0).map((x, index) => {
    const currentIndex = index + 1;
    const path = 'assets/' + directoryName + '/' + refPrefix + '-' + currentIndex + '.' + extension;
    const reference = refPrefix.toUpperCase() + '-' + currentIndex;
    const basketInfos =  {
      selectedQuantity: 1,
      selectedSize: ItemSizeEnum.M,
      selectedModel: 'Modèle unique'
    };
    return new ItemInfos(path, false, reference, currentIndex, category,false, basketInfos);
  });
}
