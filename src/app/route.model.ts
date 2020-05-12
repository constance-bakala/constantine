import {Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: WelcomeComponent,
  },
  {
    path: 'portfolio',
    redirectTo: 'home',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'earrings',
    loadChildren: () => import('./jewellery/jewellery.module').then(m => m.JewelleryModule)
  },
  {
    path: 'masks',
    loadChildren: () => import('./masks/masks.module').then(m => m.MasksModule)
  },
  {
    path: 'dresses',
    loadChildren: () => import('./clothing/clothing.module').then(m => m.ClothingModule)
  },
   {
    path: '**',
    component: NotFoundComponent
  }
];
