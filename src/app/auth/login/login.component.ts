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

    this.centerOAuthPopup();
    this.startFirebaseUi('popup');
  }

  /** Intercepte window.open pour centrer la fenêtre OAuth sur l'écran. */
  private centerOAuthPopup(): void {
    const original = window.open.bind(window);
    (window as any).open = function(url?: string | URL, target?: string, _features?: string) {
      const w = 500;
      const h = 600;
      const left = Math.round((screen.width  - w) / 2);
      const top  = Math.round((screen.height - h) / 2);
      const centered = `width=${w},height=${h},left=${left},top=${top},scrollbars=yes,resizable=yes`;
      return original(url, target ?? '_blank', centered);
    };
  }

  ngOnDestroy(): void {
    if (this.ui?.delete) {
      this.ui.delete();
    }
  }

  private startFirebaseUi(flow: 'popup' | 'redirect'): void {
    const uiConfig: any = {
      signInFlow: flow,
      signInOptions: this.signInOptions,
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any) => {
          this.dispatchLoggedIn(authResult);
          return false; // navigation gérée par l'effet NgRx
        },
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

  private dispatchLoggedIn(resultLike: any): void {
    const payload = initLoginPayload(resultLike);
    this.ngZone.run(() => {
      this.store.dispatch(new ActionAuthLoggedIn(payload));
    });
  }
}
