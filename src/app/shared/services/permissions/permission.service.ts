import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PERMISSIONS } from './list';
import {ILoginSuccess} from '@shared/interfaces';
import {selectorAuth} from '@app/auth/store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  user: ILoginSuccess;

  constructor(store: Store<any>) {
    store.subscribe(state => {
      if (state) {
        const authState = selectorAuth(state);
        if (authState && authState.user) {
          this.user = authState.user;
        }
      }
    });
  }

  /**
   * @private
   * Renvoi `true` si la liste des permission est vide
   * Utile afin d'éviter les exceptions
   */
  private isPermissionsListEmpty() {
    return (
      !this.user ||
      !Array.isArray(this.user.userHabilitations) ||
      this.user.userHabilitations.length === 0
    );
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

    return (
      PERMISSIONS[p] &&
      this.user.userHabilitations.lastIndexOf(PERMISSIONS[p].index) >= 0
    );
  }
}
