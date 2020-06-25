import {ItemInfos, ItemsCategoriesEnum, ItemSizeEnum} from '@shared/interfaces';

export const DRESSES_SIZE = 48;
export const EARINGS_SIZE = 17;
export const MASKS_SIZE = 62;

export function getAssetItems(size: number, directoryName: string, refPrefix: string, extension, category: ItemsCategoriesEnum): ItemInfos[] {
  return Array(size).fill(0).map((x, index) => {
    const currentIndex = index + 1;
    const path = 'assets/' + directoryName + '/' + refPrefix + '-' + currentIndex + '.' + extension;
    const reference = refPrefix.toUpperCase() + '-' + currentIndex;
    const basketInfos =  {
      selectedQuantity: 1,
      selectedSize: ItemSizeEnum.M,
      selectedModel: 'MODEL_UNIQUE'
    };
    return new ItemInfos(path, false, reference, currentIndex, category,false, basketInfos);
  });
}
