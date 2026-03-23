import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Database, ref, get } from '@angular/fire/database';
import { firstValueFrom } from 'rxjs';
import { filter, take } from 'rxjs/operators';

/**
 * Guard qui vérifie que l'utilisateur connecté est présent dans admins/{uid}.
 * Utilise le SDK Firebase modular (même instance que le reste de l'app).
 */
@Injectable({ providedIn: 'root' })
export class AdminGuard {

  constructor(
    private router: Router,
    private auth: Auth,
    private db: Database,
  ) {}

  async canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Promise<boolean> {
    const user = await firstValueFrom(
      authState(this.auth).pipe(
        filter(u => u !== undefined),
        take(1),
      )
    );

    if (!user) {
      this.router.navigateByUrl('/auth/signin');
      return false;
    }

    try {
      const snap = await get(ref(this.db, `admins/${user.uid}`));
      if (snap.exists()) return true;
      this.router.navigateByUrl('/home');
      return false;
    } catch (e) {
      console.error('[AdminGuard] Erreur lecture DB:', e);
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
