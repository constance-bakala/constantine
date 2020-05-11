import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasksListComponent } from './masks-list/masks-list.component';
import {MaskRoutingModule} from './mask-routing.module';



@NgModule({
  declarations: [MasksListComponent],
  imports: [
    CommonModule,
    MaskRoutingModule,
  ]
})
export class MasksModule { }
