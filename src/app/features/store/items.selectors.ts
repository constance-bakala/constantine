import {ItemInfos} from '@shared/interfaces';
import {createSelector} from '@ngrx/store';

export function selectEarings(state): ItemInfos[] {
  return state.constantine.items.earings;
}

export function selectDresses(state): ItemInfos[] {
  return state.constantine.items.dresses;
}

export function selectMasks(state): ItemInfos[] {
  return state.constantine.items.masks;
}

export const selectNbChosenItem = createSelector(
  selectEarings,
  selectDresses,
  selectMasks,
  (earings: ItemInfos[], dresses: ItemInfos[], masks: ItemInfos[]) => {
    return earings.filter(earing => earing.payload.selected).length +
      dresses.filter(dress => dress.payload.selected).length +
      masks.filter(mask => mask.payload.selected).length
  }
);
