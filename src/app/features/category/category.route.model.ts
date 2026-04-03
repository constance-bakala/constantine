import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { ItemPageComponent } from './item-page/item-page.component';

export const categoryRoutes: Routes = [
  { path: ':prefix', component: CategoryComponent },
  { path: ':prefix/items/:reference', component: ItemPageComponent },
];
