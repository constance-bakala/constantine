import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ActionAuthLoggedIn, ActionAuthLoggedOut} from '@app/auth/store/auth.actions';
import {initLoginPayload} from '@helpers/common.services.utils';

@Component({
  selector: 'social-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;
  signInOptions = [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email',
        'user_likes',
      ]
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ];

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private ngZone: NgZone,
              private store: Store<any>) {
  }

  ngOnInit() {
    const uiConfig = {
      signInOptions: this.signInOptions,
      callbacks: {
        signInSuccessWithAuthResult: this
          .onLoginSuccessful
          .bind(this),
      }
    };
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebaseui-auth-container1, #firebaseui-auth-container2', uiConfig);
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


