export interface ImageMetaData {
  index: number;
  suffix: string;
}

export class Category {
  name: ItemsCategoriesEnum;
  title: string;
  summary: string;
  items: ItemInfos[]
}

export class ItemInfos {
  constructor(public payload: {
    path: string,
    selected: boolean,
    reference: string,
    index: number,
    category: ItemsCategoriesEnum,
    loading:boolean}){}
}

export enum ItemsCategoriesEnum {
  EARINGS = 'EARINGS',
  MASKS = 'MASKS',
  DRESSES = 'DRESSES',
  UNKNOWN = 'UNKNOWN',
}
