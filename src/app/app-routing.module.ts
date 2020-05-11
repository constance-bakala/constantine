import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {routes} from './route.model';


@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true, initialNavigation: 'enabled', scrollPositionRestoration: 'top'}),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
  ]
})
export class AppRoutingModule {}
