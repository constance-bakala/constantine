import {Routes} from '@angular/router';
import {CartItemsComponent} from '@app/features/shopping-cart/cart-items/cart-items.component';

export const shoppingCartRoutes: Routes = [
  {
    path: '',
    component: CartItemsComponent,
  },
];
