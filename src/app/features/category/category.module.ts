import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { categoryRoutes } from './category.route.model';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(categoryRoutes),
  ],
})
export class CategoryModule {}
