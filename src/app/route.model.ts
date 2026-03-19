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
    path: 'earings',
    loadChildren: () => import('./features/jewellery/jewellery.module').then(m => m.JewelleryModule),
    data: {
      seoTitle: 'Bijoux & Boucles d\'Oreilles Africaines Artisanales – Délice Éternel | Libreville Gabon',
      seoDesc:  'Boucles d\'oreilles et bijoux africains artisanaux, faits main à Libreville, Gabon. Colliers, bracelets, créations uniques. Commandez en ligne.',
    },
  },
  {
    path: 'masks',
    loadChildren: () => import('./features/masks/masks.module').then(m => m.MasksModule),
    data: {
      seoTitle: 'Masques Africains Artisanaux – Délice Éternel | Libreville Gabon',
      seoDesc:  'Masques africains artisanaux conçus à Libreville, Gabon. Design unique, qualité supérieure, disponibles à la commande en ligne.',
    },
  },
  {
    path: 'dresses',
    loadChildren: () => import('./features/clothing/clothing.module').then(m => m.ClothingModule),
    data: {
      seoTitle: 'Robes Africaines Sur Mesure, Pagnes Wax & Tenues – Délice Éternel | Libreville Gabon',
      seoDesc:  'Robes africaines sur mesure en pagne wax, tenues de cérémonie et mariage, vêtements homme femme enfant. Couturière à Libreville, Gabon. Livraison mondiale.',
    },
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
    path: '**',
    redirectTo: 'home',
  }
];
