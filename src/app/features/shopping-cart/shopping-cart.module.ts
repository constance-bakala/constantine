import {NgModule} from '@angular/core';
import {CartItemsComponent} from './cart-items/cart-items.component';
import {SharedModule} from '@shared/shared.module';
import {ShoppingCartRoutingModule} from '@app/features/shopping-cart/shopping-cart.routing.module';
import {AuthModule} from '@app/auth/auth.module';


@NgModule({
  declarations: [CartItemsComponent],
  imports: [
    SharedModule,
    ShoppingCartRoutingModule,
    AuthModule,
  ]
})
export class ShoppingCartModule { }
