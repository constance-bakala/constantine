import {NgModule} from '@angular/core';
import {CartItemsComponent} from './cart-items/cart-items.component';
import {SharedModule} from '@shared/shared.module';
import {ShoppingCartRoutingModule} from '@app/features/shopping-cart/shopping-cart.routing.module';


@NgModule({
  declarations: [CartItemsComponent],
  imports: [
    SharedModule,
    ShoppingCartRoutingModule,
  ]
})
export class ShoppingCartModule { }
