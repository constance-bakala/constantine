import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Auth } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Go } from '@app/auth/store';

/**
 * Guard qui vérifie que l'utilisateur connecté est présent dans admins/{uid}.
 * authStateReady() attend que Firebase ait chargé l'état d'auth avant de décider.
 */
@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(
    private authService: Auth,
    private store: Store<any>,
  ) {}

  async canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Promise<boolean> {
    // Attend que Firebase ait terminé de charger l'état d'auth (IndexedDB)
    await this.authService.authStateReady();

    const u = this.authService.currentUser;

    if (!u) {
      this.store.dispatch(new Go({ path: ['/auth/signin'] }));
      return false;
    }

    try {
      const snap = await firebase.database().ref(`admins/${u.uid}`).once('value');
      if (snap.exists()) return true;
      this.store.dispatch(new Go({ path: ['/home'] }));
      return false;
    } catch (e) {
      console.error('[AdminGuard] Erreur lecture DB:', e);
      this.store.dispatch(new Go({ path: ['/home'] }));
      return false;
    }
  }
}
