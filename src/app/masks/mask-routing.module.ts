import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {masksRoutes} from './mask.route.model';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(masksRoutes),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
  ]
})
export class MaskRoutingModule {}
