import {NgModule} from '@angular/core';
import {EaringListComponent} from './earring-list/earing-list.component';
import {JewelleryRoutingModule} from './jewellery-routing.module';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [EaringListComponent],
  imports: [
    JewelleryRoutingModule,
    SharedModule,
  ]
})
export class JewelleryModule { }
