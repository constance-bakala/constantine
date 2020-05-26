import {Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './features/welcome/welcome.component';

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
    path: 'earings',
    loadChildren: () => import('./features/jewellery/jewellery.module').then(m => m.JewelleryModule)
  },
  {
    path: 'masks',
    loadChildren: () => import('./features/masks/masks.module').then(m => m.MasksModule)
  },
  {
    path: 'dresses',
    loadChildren: () => import('./features/clothing/clothing.module').then(m => m.ClothingModule)
  },
  {
    path: 'shoping-cart',
    loadChildren: () => import('./features/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
