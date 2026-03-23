import {Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './features/welcome/welcome.component';
import {AdminGuard} from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: WelcomeComponent,
    data: {
      seoTitle: 'Délice Éternel – Couturière & Mode Africaine | Robes, Bijoux, Pagnes | Libreville Gabon',
      seoDesc:  'Couturière-esthéticienne à Libreville, Gabon. Robes africaines sur mesure, pagnes wax, bijoux artisanaux, vêtements pour homme, femme et enfant. Commandez en ligne, livraison mondiale.',
    },
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
    path: 'shopping-cart',
    loadChildren: () => import('./features/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
    data: {
      seoTitle: 'Votre Panier – Délice Éternel',
      seoDesc:  'Finalisez votre commande de créations artisanales africaines Délice Éternel.',
    },
  },
  {
    path: 'auth',
    loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'category',
    loadChildren: () => import('./features/category/category.module').then(m => m.CategoryModule),
  },
  {
    path: 'order-history',
    loadChildren: () => import('./features/order-history/order-history.module').then(m => m.OrderHistoryModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
