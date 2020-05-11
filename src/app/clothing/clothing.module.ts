import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClothingListComponent } from './clothing-list/clothing-list.component';
import {ClothingRoutingModule} from './clothing-routing.module';



@NgModule({
  declarations: [ClothingListComponent],
  imports: [
    CommonModule,
    ClothingRoutingModule,
  ]
})
export class ClothingModule { }
