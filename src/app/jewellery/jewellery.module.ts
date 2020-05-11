import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JewelleryListComponent } from './jewellery-list/jewellery-list.component';
import {JewelleryRoutingModule} from './jewellery-routing.module';



@NgModule({
  declarations: [JewelleryListComponent],
  imports: [
    CommonModule,
    JewelleryRoutingModule,
  ]
})
export class JewelleryModule { }
