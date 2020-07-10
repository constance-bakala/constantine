import {NgModule} from '@angular/core';
import {CartItemsComponent} from './cart-items/cart-items.component';
import {SharedModule} from '@shared/shared.module';
import {ShoppingCartRoutingModule} from '@app/features/shopping-cart/shopping-cart.routing.module';
import {AuthModule} from '@app/auth/auth.module';
import {BasketItemComponent} from '@app/features/shopping-cart/cart-items/basket-item/basket-item.component';


@NgModule({
  declarations: [CartItemsComponent,
    BasketItemComponent],
  imports: [
    SharedModule,
    ShoppingCartRoutingModule,
    AuthModule,
  ]
})
export class ShoppingCartModule { }
