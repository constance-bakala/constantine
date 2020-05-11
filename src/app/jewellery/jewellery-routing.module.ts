import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {jewelleryRoutes} from './jewellery.route.model';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(jewelleryRoutes),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
  ]
})
export class JewelleryRoutingModule {}
