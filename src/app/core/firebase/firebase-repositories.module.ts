import { NgModule } from '@angular/core';
import { AuthRepository } from './auth.repository';
import { CatalogRepository } from './catalog.repository';
import { OrdersRepository } from './orders.repository';
import { UsersRepository } from './users.repository';

/**
 * FirebaseRepositoriesModule
 * Regroupe les repositories Firebase. Importé par CoreModule.
 * Les repositories sont providedIn: 'root' — ce module sert de point d'entrée déclaratif.
 */
@NgModule({
  providers: [
    AuthRepository,
    CatalogRepository,
    OrdersRepository,
    UsersRepository,
  ],
})
export class FirebaseRepositoriesModule {}
