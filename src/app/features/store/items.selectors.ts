import {Category, ItemInfos} from '@shared/interfaces';
import {createSelector} from '@ngrx/store';

export function selectEarings(state): Category {
  return state.constantine.items.earings;
}

export function selectDresses(state): Category {
  return state.constantine.items.dresses;
}

export function selectMasks(state): Category {
  return state.constantine.items.masks;
}

export const selectNbChosenItems = createSelector(
  selectEarings,
  selectDresses,
  selectMasks,
  (earings: Category, dresses: Category, masks: Category) => {
    return earings.items.filter(earing => earing.payload.selected).length +
      dresses.items.filter(dress => dress.payload.selected).length +
      masks.items.filter(mask => mask.payload.selected).length
  }
);

export const selectChosenItems = createSelector(
  selectEarings,
  selectDresses,
  selectMasks,
  (earings: Category, dresses: Category, masks: Category) => {
    return earings.items.filter(earing => earing.payload.selected)
      .concat(dresses.items.filter(dress => dress.payload.selected))
      .concat(masks.items.filter(mask => mask.payload.selected));
  }
);


