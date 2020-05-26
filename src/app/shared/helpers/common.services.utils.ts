import {ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';

export function getAssetItems(size: number, directoryName: string, refPrefix: string, extension, category: ItemsCategoriesEnum): ItemInfos[] {
  return Array(size).fill(0).map((x, index) => {
    const currentIndex = index + 1;
    const path = 'assets/' + directoryName + '/' + refPrefix + '-' + currentIndex + '.' + extension;
    const reference = refPrefix.toUpperCase() + '-' + currentIndex;
    return new ItemInfos({
      path,
      selected: false,
      reference,
      index: currentIndex,
      category,
      loading: false});
  });
}
