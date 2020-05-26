import {NgModule} from '@angular/core';
import {ClothingModule} from '@app/features/clothing/clothing.module';
import {JewelleryModule} from '@app/features/jewellery/jewellery.module';
import {MasksModule} from '@app/features/masks/masks.module';
import {StoreModule} from '@ngrx/store';
import {clearState} from '@app/auth/store';
import {EffectsModule} from '@ngrx/effects';
import {ItemsEffects, itemsReducer} from '@app/features/store';
import {BasketComponent} from './basket/basket.component';
import {basketReducer} from '@app/features/basket/store';


@NgModule({
  declarations: [BasketComponent],
  imports: [
    ClothingModule,
    JewelleryModule,
    MasksModule,
    StoreModule.forFeature(
      'constantine',
      { items: itemsReducer, basket: basketReducer},
      { metaReducers: [clearState]}
    ),
    EffectsModule.forFeature([ItemsEffects])
  ]
})
export class FeaturesModule { }
