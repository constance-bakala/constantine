import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {shoppingCartRoutes} from '@app/features/shopping-cart/shopping-cart.route.model';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(shoppingCartRoutes),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
  ]
})
export class ShoppingCartRoutingModule {}
