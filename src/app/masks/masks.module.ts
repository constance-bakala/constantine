import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasksListComponent } from './masks-list/masks-list.component';
import {MaskRoutingModule} from './mask-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [MasksListComponent],
  imports: [
    SharedModule,
    MaskRoutingModule,
  ]
})
export class MasksModule { }
