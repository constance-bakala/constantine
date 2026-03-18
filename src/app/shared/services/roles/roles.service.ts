import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { IRole, ROLES } from './list';
import { filter } from 'rxjs/operators';
import { ILoginSuccess } from '@shared/interfaces';
import { selectorAuth, selectUser } from '@app/auth/store/auth.selectors';
import { AuthState } from '@app/auth/store';

type UserType = ILoginSuccess;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  current: ILoginSuccess | undefined;

  constructor(private store: Store<any>) {
    this.store
      .pipe(
        select(selectorAuth),
        filter(state => !!state)
      )
      .subscribe((state: AuthState) => (this.current = state.user));
  }

  private is(user: ILoginSuccess | undefined, role: IRole): boolean {
    if (user === undefined) {
      return false;
    }
    return user && user.indexRole === role.index;
  }

  public getRole(user?: UserType): string {
    const targetUser = user ?? this.current;
    if (targetUser === undefined) {
      return 'NO_ROLE';
    }
    switch (targetUser.indexRole) {
      case ROLES.ROLE_CONNECTED_USER.index:
        return ROLES.ROLE_CONNECTED_USER.value;
      case ROLES.ROLE_ADMINISTRATEUR.index:
        return ROLES.ROLE_ADMINISTRATEUR.value;
      case ROLES.ROLE_ANONYMOUSE_USER.index:
        return ROLES.ROLE_ANONYMOUSE_USER.value;
    }
    return 'NO_ROLE';
  }

  isAdmin(user?: UserType): boolean {
    return this.is(user ?? this.current, ROLES.ROLE_ADMINISTRATEUR);
  }

  isAnonymouse(user?: UserType): boolean {
    return this.is(user ?? this.current, ROLES.ROLE_ANONYMOUSE_USER);
  }

  isUser(user?: UserType): boolean {
    return this.is(user ?? this.current, ROLES.ROLE_CONNECTED_USER);
  }


  canEdit(user: UserType | undefined = this.current): boolean {
    return (
      this.isAdmin(user) ||
      this.isUser(user)
    );
  }
}
