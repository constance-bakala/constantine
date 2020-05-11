import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {clothingRoutes} from './clothing.route.model';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(clothingRoutes),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
  ]
})
export class ClothingRoutingModule {}
