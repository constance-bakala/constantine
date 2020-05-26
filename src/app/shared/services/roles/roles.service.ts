import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {IRole, ROLES} from './list';
import {filter} from 'rxjs/internal/operators';
import {ILoginSuccess} from '@shared/interfaces';
import {AuthState, selectorAuth} from '@app/auth/store/auth.reducer';

type UserType = ILoginSuccess;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  current: ILoginSuccess;

  constructor(private store: Store<any>) {
    this.store
      .pipe(
        select(selectorAuth),
        filter(state => !!state)
      )
      .subscribe((state: AuthState) => (this.current = state.user));
  }

  private is(user: UserType = this.current, role: IRole): boolean {
    return user && user.indexRole === role.index;
  }

  public getRole(user: UserType = this.current): string {
    switch (user.indexRole) {
      case ROLES.ROLE_CONNECTED_USER.index :
        return ROLES.ROLE_CONNECTED_USER.value;
      case ROLES.ROLE_ADMINISTRATEUR.index :
        return ROLES.ROLE_ADMINISTRATEUR.value;
      case ROLES.ROLE_ANONYMOUSE_USER.index :
        return ROLES.ROLE_ANONYMOUSE_USER.value;
    }
    return 'NO_ROLE';
  }

  isAdmin(user: UserType = this.current): boolean {
    return this.is(user, ROLES.ROLE_ADMINISTRATEUR);
  }

  isAnonymouse(user: UserType = this.current): boolean {
    return this.is(user, ROLES.ROLE_ANONYMOUSE_USER);
  }

  isUser(user: UserType = this.current): boolean {
    return this.is(user, ROLES.ROLE_CONNECTED_USER);
  }


  canEdit(user: UserType = this.current): boolean {
    return (
      this.isAdmin() ||
      this.isUser()
    );
  }
}
