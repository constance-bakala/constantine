import {ItemsState} from '@app/features/store';


export const selectorBasket = (state): ItemsState => state.constantine.items;
