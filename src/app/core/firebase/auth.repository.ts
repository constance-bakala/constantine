import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { environment } from '@env/environment';

// ── Constantes fournisseurs ───────────────────────────────────────────────────
export const AUTH_PROVIDERS = {
  GOOGLE:   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  FACEBOOK: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  EMAIL:    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  TWITTER:  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
} as const;

export const AUTH_PERSISTENCE = firebase.auth.Auth.Persistence;

/**
 * AuthRepository
 * Seule classe autorisée à appeler firebase.auth() directement.
 */
@Injectable({ providedIn: 'root' })
export class AuthRepository {

  // ── Initialisation ────────────────────────────────────────────────────────

  /** Initialise l'app Firebase compat si ce n'est pas déjà fait. */
  ensureAppInitialized(): void {
    if (!firebase.apps?.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }

  /** Expose firebase sur window — nécessaire pour FirebaseUI. */
  exposeGlobally(): void {
    (window as any).firebase = firebase;
  }

  // ── Configuration ─────────────────────────────────────────────────────────

  setLanguageCode(code: string): void {
    firebase.auth().languageCode = code;
  }

  setPersistence(persistence: firebase.auth.Auth.Persistence): Promise<void> {
    return firebase.auth().setPersistence(persistence);
  }

  // ── Accès instance (usage FirebaseUI uniquement) ──────────────────────────

  /** Renvoie l'instance auth compat — réservé à l'initialisation FirebaseUI. */
  getCompatAuth(): firebase.auth.Auth {
    return firebase.auth();
  }

  // ── Utilisateur courant ───────────────────────────────────────────────────

  getCurrentUser(): firebase.User | null {
    return firebase.auth().currentUser;
  }

  // ── Actions d'authentification ────────────────────────────────────────────

  signInAnonymously(): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInAnonymously();
  }

  createUserWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  linkWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
    const user = firebase.auth().currentUser;
    if (!user) return Promise.reject(new Error('[AuthRepository] No current user to link'));
    return user.linkWithCredential(credential);
  }

  // ── Observable ────────────────────────────────────────────────────────────

  /** Observable de l'état d'authentification Firebase (se désabonne automatiquement). */
  watchAuthState(): Observable<firebase.User | null> {
    return new Observable(subscriber => {
      const unsub = firebase.auth().onAuthStateChanged(
        u  => subscriber.next(u),
        err => subscriber.error(err),
      );
      return () => unsub();
    });
  }
}
