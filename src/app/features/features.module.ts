import {NgModule} from '@angular/core';
import {ClothingModule} from '@app/features/clothing/clothing.module';
import {JewelleryModule} from '@app/features/jewellery/jewellery.module';
import {MasksModule} from '@app/features/masks/masks.module';
import {StoreModule} from '@ngrx/store';
import {clearState} from '@app/auth/store';
import {EffectsModule} from '@ngrx/effects';
import {ItemsEffects, itemsReducer} from '@app/features/store';
import {ShoppingCartModule} from '@app/features/shopping-cart/shopping-cart.module';


@NgModule({
  declarations: [],
  imports: [
    ClothingModule,
    JewelleryModule,
    MasksModule,
    ShoppingCartModule,
    StoreModule.forFeature(
      'constantine',
      { items: itemsReducer},
      { metaReducers: [clearState]}
    ),
    EffectsModule.forFeature([ItemsEffects])
  ]
})
export class FeaturesModule { }
