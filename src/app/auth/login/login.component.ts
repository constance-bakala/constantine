import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { environment } from '../../../environments/environment'; // <-- ajuste le chemin si besoin
import { ActionAuthLoggedIn } from '@app/auth/store/auth.actions';
import { initLoginPayload } from '@helpers/common.services.utils';
import { DEFAULT_LOCALE_ID } from '@helpers/constants';

declare const firebaseui: any;

@Component({
  selector: 'social-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: any;
  private fallbackTimer: any;

  signInOptions = [
    { provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID, customParameters: { locale: DEFAULT_LOCALE_ID } },
    { provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID, customParameters: { locale: DEFAULT_LOCALE_ID } },
    { provider: firebase.auth.EmailAuthProvider.PROVIDER_ID, customParameters: { locale: DEFAULT_LOCALE_ID } },
    { provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID, customParameters: { locale: DEFAULT_LOCALE_ID } },
  ];

  constructor(private ngZone: NgZone, private store: Store<any>) {}

  async ngOnInit(): Promise<void> {
    // ✅ IMPORTANT : init Firebase COMPAT (FirebaseUI dépend de compat)
    if (!firebase.apps?.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }

    (window as any).firebase = firebase;

    firebase.auth().languageCode = DEFAULT_LOCALE_ID;
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        this.clearFallback();
        this.dispatchLoggedIn({ user: u });
      }
    });

    this.startFirebaseUi(this.isLocalhost() ? 'popup' : 'redirect');
    if (!this.isLocalhost()) {
      this.scheduleRedirectFallbackToPopup();
    }
  }

  ngOnDestroy(): void {
    this.clearFallback();
    if (this.ui?.delete) {
      this.ui.delete();
    }
  }

  private isLocalhost(): boolean {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '[::1]';
  }

  private startFirebaseUi(flow: 'popup' | 'redirect'): void {
    const uiConfig: any = {
      signInFlow: flow,
      signInOptions: this.signInOptions,
      signInSuccessUrl: window.location.origin + window.location.pathname + '#/auth/signin',
      callbacks: {
        signInFailure: (error: any) => {
          console.error('[FirebaseUI] failure', error);
          return Promise.resolve();
        },
      },
    };

    try {
      const existing = firebaseui.auth.AuthUI.getInstance();
      this.ui = existing ?? new firebaseui.auth.AuthUI(firebase.auth());
    } catch {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  private scheduleRedirectFallbackToPopup(): void {
    this.clearFallback();
    this.fallbackTimer = setTimeout(() => {
      const current = firebase.auth().currentUser;
      if (!current) {
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
    const payload = initLoginPayload(resultLike);
    this.ngZone.run(() => {
      this.store.dispatch(new ActionAuthLoggedIn(payload));
    });
  }
}
