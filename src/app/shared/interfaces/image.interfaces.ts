export class Category {
  name!: string;
  title!: string;
  summary!: string;     // FR
  summaryEn?: string;   // EN
  items!: ItemInfos[]
}

export class CategoryInfos {
  name!: string;
  title!: string;
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
    public category: string,
    public loading: boolean,
    public basketInfos: IBasketInfos,
    public images: string[] = [],
    public price: number = 0,
    public descriptionFr?: string,
    public descriptionEn?: string,
    public tryonUrl?: string,
    public complementaryItemRefs?: string[]) { }
}

export interface ItemsState {
  categories: Record<string, Category>;
}
