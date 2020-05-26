import {ItemsState} from '@app/features/store';


export const selectorAuth = (state): ItemsState => state.constantine.items;
