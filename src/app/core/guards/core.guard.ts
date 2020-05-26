import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {ActionDisplayFooter, ActionHideFooter, ActionHideWrapper, AuthState, Go, selectorAuth} from '../../auth/store';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private store: Store<any>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectorAuth),
      map((s: AuthState) => {
        if (!s.isAuthenticated) {
          this.store.dispatch(
            new Go({
              path: ['/auth/signin']
            })
          );
        }
        return s.isAuthenticated;
      })
    );
  }
}


@Injectable()
export class RemoveWrapperGuard implements CanActivate, CanDeactivate<any> {
  constructor(private store: Store<any>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    this.store.dispatch(new ActionHideWrapper());
    return true;
  }

  canDeactivate(): boolean {
    return true;
  }
}

@Injectable()
export class RemoveFooterGuard implements CanActivate, CanDeactivate<any> {
  constructor(private store: Store<any>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    this.store.dispatch(new ActionHideFooter());
    return true;
  }

  canDeactivate(): boolean {
    this.store.dispatch(new ActionDisplayFooter());
    return true;
  }
}