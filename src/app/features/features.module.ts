import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ItemsEffects, itemsReducer } from '@app/features/store';
import { ShoppingCartModule } from '@app/features/shopping-cart/shopping-cart.module';
import { catalogReducer } from '@app/features/store/catalog/catalog.reducer';
import { CatalogEffects } from '@app/features/store/catalog/catalog.effects';


@NgModule({
  declarations: [],
  imports: [
    ShoppingCartModule,
    StoreModule.forFeature('constantine', itemsReducer),
    StoreModule.forFeature('catalog', catalogReducer),
    EffectsModule.forFeature([ItemsEffects, CatalogEffects]),
  ]
})
export class FeaturesModule { }
