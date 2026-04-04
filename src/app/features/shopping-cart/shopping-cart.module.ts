import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CheckoutStepperComponent } from './checkout-stepper/checkout-stepper.component';
import { CartItemRowComponent } from './cart-item-row/cart-item-row.component';
import { DeliveryStepComponent } from './delivery-step/delivery-step.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from '@shared/shared.module';
import { ShoppingCartRoutingModule } from '@app/features/shopping-cart/shopping-cart.routing.module';
import { AuthModule } from '@app/auth/auth.module';

@NgModule({
  declarations: [
    CartItemsComponent,
    CheckoutStepperComponent,
    CartItemRowComponent,
    DeliveryStepComponent,
    OrderSummaryComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ShoppingCartRoutingModule,
    AuthModule,
  ]
})
export class ShoppingCartModule { }
