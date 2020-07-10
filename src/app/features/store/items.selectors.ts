import {Category, CategoryInfos, ItemInfos} from '@shared/interfaces';
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
    return computeTotalQuantity(earings.items.filter(earing => earing.selected)) +
      computeTotalQuantity(dresses.items.filter(dress => dress.selected)) +
      computeTotalQuantity(masks.items.filter(mask => mask.selected))
  }
);

function computeTotalQuantity(items: ItemInfos[]): number {
  return items.map(item => item.basketInfos?.selectedQuantity ?? 1)
    .reduce((sum, current) => sum + current, 0);
}

export const selectChosenItems = createSelector(
  selectEarings,
  selectDresses,
  selectMasks,
  (earings: Category, dresses: Category, masks: Category) => {
    return earings.items
      .filter(earing => earing.selected)
      .concat(dresses.items.filter(dress => dress.selected))
      .concat(masks.items.filter(mask => mask.selected));
  }
);

export const selectExistingCategory = createSelector(
  selectEarings,
  selectDresses,
  selectMasks,
  (earings: Category, dresses: Category, masks: Category) => {
    return {
      earings: <CategoryInfos>{
        title: earings.title,
        name: earings.name,
      },
      dresses: <CategoryInfos>{
        title: dresses.title,
        name: dresses.name
      },
      masks: <CategoryInfos>{
        title: masks.title,
        name: masks.name
      }
    };
  }
);


