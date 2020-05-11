import {NgModule} from '@angular/core';
import {DressListComponent} from './dress-list/dress-list.component';
import {ClothingRoutingModule} from './clothing-routing.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [DressListComponent],
  imports: [
    SharedModule,
    ClothingRoutingModule,
  ]
})
export class ClothingModule { }
