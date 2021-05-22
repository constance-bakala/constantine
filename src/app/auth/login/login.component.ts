import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ActionAuthLoggedIn, ActionAuthLoggedOut} from '@app/auth/store/auth.actions';
import {initLoginPayload} from '@helpers/common.services.utils';
import {DEFAULT_LOCALE_ID} from '@helpers/constants';

@Component({
  selector: 'social-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;
  signInOptions = [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        'locale': DEFAULT_LOCALE_ID
      }
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      customParameters: {
        'locale': DEFAULT_LOCALE_ID
      }
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      customParameters: {
        'locale': DEFAULT_LOCALE_ID
      }
    },
    {
      provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      customParameters: {
        'locale': DEFAULT_LOCALE_ID
      }
    }
  ];

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private ngZone: NgZone,
              private store: Store<any>) {
  }


  ngOnInit() {
    firebase.auth().languageCode = DEFAULT_LOCALE_ID;
    const uiConfig = {
      signInOptions: this.signInOptions,
      callbacks: {
        signInSuccessWithAuthResult: this
          .onLoginSuccessful
          .bind(this),
      }
    };
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onLoginSuccessful(result) {
    this.ngZone.run(() => {
      this.store.dispatch(new ActionAuthLoggedIn(initLoginPayload(result)));
    });
  }

  onLogoutSuccessful(result) {
    this.ngZone.run(() => {
      this.store.dispatch(new ActionAuthLoggedOut());
    });
  }
}


