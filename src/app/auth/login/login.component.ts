import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { ActionAuthLoggedIn } from '@app/auth/store/auth.actions';
import { initLoginPayload } from '@helpers/common.services.utils';
import { DEFAULT_LOCALE_ID } from '@helpers/constants';

declare const firebaseui: any;

@Component({
  selector: 'social-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: any;

  private fallbackTimer: any;
  private started = false;

  signInOptions = [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: { locale: DEFAULT_LOCALE_ID },
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      customParameters: { locale: DEFAULT_LOCALE_ID },
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      customParameters: { locale: DEFAULT_LOCALE_ID },
    },
    {
      provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      customParameters: { locale: DEFAULT_LOCALE_ID },
    },
  ];

  constructor(
    private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private store: Store<any>
  ) {}

  async ngOnInit(): Promise<void> {
    // firebaseui.js (UMD) attend window.firebase
    (window as any).firebase = firebase;

    firebase.auth().languageCode = DEFAULT_LOCALE_ID;

    // Persistance (évite user null après retour)
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    // 1) Source de vérité : si un user apparaît, on login
    firebase.auth().onAuthStateChanged((u) => {
      console.log('[AuthStateChanged]', u?.uid, u?.email);

      if (u) {
        this.clearFallback();
        this.dispatchLoggedIn({ user: u });
      }
    });

    // 2) Démarrer FirebaseUI avec le bon flow
    const isLocalhost = this.isLocalhost();
    const preferredFlow: 'popup' | 'redirect' = isLocalhost ? 'popup' : 'redirect';

    this.startFirebaseUi(preferredFlow);

    // 3) En prod (redirect), si après retour l’utilisateur est toujours null -> fallback popup
    //    (ex: cookies tiers, navigateur, hash routing, etc.)
    if (!isLocalhost) {
      this.scheduleRedirectFallbackToPopup();
    }
  }

  ngOnDestroy(): void {
    this.clearFallback();
    if (this.ui?.delete) {
      this.ui.delete();
    }
  }

  // ---------- Core helpers ----------

  private isLocalhost(): boolean {
    return (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '[::1]'
    );
  }

  private startFirebaseUi(flow: 'popup' | 'redirect'): void {
    // évite de redémarrer 50 fois
    if (this.started && flow === 'redirect') {
      // on peut redémarrer en popup si fallback
    }

    console.log('[FirebaseUI] start with flow:', flow);

    // Nettoyer instance existante
    try {
      const existing = firebaseui.auth.AuthUI.getInstance();
      if (existing) existing.reset();
    } catch {}

    const uiConfig: any = {
      signInFlow: flow,
      signInOptions: this.signInOptions,

      // Important pour apps en hash routing : URL de retour stable
      // (FirebaseUI l’utilise surtout en redirect)
      signInSuccessUrl: window.location.origin + window.location.pathname + '#/auth/signin',

      callbacks: {
        // On ne dépend PAS du callback success (il peut ne jamais se déclencher en redirect)
        signInFailure: (error: any) => {
          console.error('[FirebaseUI] failure', error);

          // si popup bloquée en local/prod, tu le verras ici
          // si on est en redirect et que ça échoue, on tentera popup via le timer
          return Promise.resolve();
        },
      },
    };

    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebaseui-auth-container', uiConfig);

    this.started = true;
  }

  private scheduleRedirectFallbackToPopup(): void {
    // Si après 2.5s aucun user (authState null), on tente popup
    // (utile quand redirect “revient” mais ne persiste pas la session)
    this.clearFallback();
    this.fallbackTimer = setTimeout(async () => {
      const current = firebase.auth().currentUser;
      console.log('[RedirectFallbackCheck] currentUser:', current?.uid ?? null);

      if (!current) {
        console.warn('[RedirectFallback] No user after redirect, fallback to popup UI');

        // on redémarre FirebaseUI en popup
        this.startFirebaseUi('popup');
      }
    }, 2500);
  }

  private clearFallback(): void {
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = undefined;
    }
  }

  private dispatchLoggedIn(resultLike: any): void {
    // resultLike peut être {user: firebase.User}
    const payload = initLoginPayload(resultLike);
    console.log('[LOGIN PAYLOAD]', payload);

    this.ngZone.run(() => {
      this.store.dispatch(new ActionAuthLoggedIn(payload));
    });
  }
}
