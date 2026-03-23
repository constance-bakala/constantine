import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

export const categoryRoutes: Routes = [
  { path: ':prefix', component: CategoryComponent },
];
