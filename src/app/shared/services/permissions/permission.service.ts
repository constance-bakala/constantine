import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PERMISSIONS } from './list';
import {ILoginSuccess} from '@shared/interfaces';
import {selectorAuth} from '@app/auth/store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class PermissionService {

  constructor(store: Store<any>) {

  }

  /**
   * @private
   * Renvoi `true` si la liste des permission est vide
   * Utile afin d'éviter les exceptions
   */
  private isPermissionsListEmpty() {
    return true;
  }

  /**
   * @private
   * Tester si l'utilisateur a une habilitation donnée
   * @param p L'habilitation à tester
   */
  private has(p: string): boolean {
    if (this.isPermissionsListEmpty()) {
      return false;
    }

    return true;
    /*return (
      PERMISSIONS[p] &&
      this.user.userHabilitations.lastIndexOf(PERMISSIONS[p].index) >= 0
    );
    */
  }
}
