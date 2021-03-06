export class Category {
  name: ItemsCategoriesEnum;
  title: string;
  summary: string;
  items: ItemInfos[]
}
export class CategoryInfos {
  name: ItemsCategoriesEnum;
  title: string;

}
export enum ItemSizeEnum {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  O = 'O',
}

export const ITEM_SIZES: {
  value: ItemSizeEnum;
  label: string;
}[] = [{
  value: ItemSizeEnum.S,
  label: 'S'
}, {
  value: ItemSizeEnum.M,
  label: 'M'
}, {
  value: ItemSizeEnum.L,
  label: 'L'
}, {
  value: ItemSizeEnum.XL,
  label: 'XL'
}];



export interface IBasketInfos {
  selectedQuantity: number;
  selectedSize: ItemSizeEnum;
  selectedModel: string;
}

export class ItemInfos {
  constructor(
    public path: string,
    public selected: boolean,
    public reference: string,
    public index: number,
    public category: ItemsCategoriesEnum,
    public loading:boolean,
    public basketInfos: IBasketInfos){}
}

export enum ItemsCategoriesEnum {
  EARINGS = 'EARINGS',
  MASKS = 'MASKS',
  DRESSES = 'DRESSES',
  UNKNOWN = 'UNKNOWN',
}

export interface ItemsState {
  earings: Category;
  dresses: Category;
  masks: Category;
}
