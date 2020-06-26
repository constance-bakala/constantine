import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ActionAuthLoggedIn, ActionAuthLoggedOut} from '@app/auth/store/auth.actions';

@Component({
  selector: 'social-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;
  @Input()
  signInOptions: string[];

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
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onLoginSuccessful(result) {
    this.ngZone.run(() => {
      this.store.dispatch(new ActionAuthLoggedIn({
        ssoToken: result?.credential?.idToken,
        token: result?.credential?.accessToken,
        userHabilitations: [],
        indexRole: -1,
        actions: {},
        other: result,
        additionalInfos: {
          id: result.additionalUserInfo.profile?.id,
          providerId: result.additionalUserInfo?.providerId,
          local: result.additionalUserInfo.profile?.locale,
          picture: result.additionalUserInfo.profile?.picture,
          nom: result.additionalUserInfo.profile?.family_name,
          prenom: result.additionalUserInfo.profile?.given_name,
          gender: result.additionalUserInfo.profile?.gender,
          email: result.additionalUserInfo.profile?.email,
        }
      }));
    });
  }
  onLogoutSuccessful(result) {
    this.ngZone.run(() => {
      this.store.dispatch(new ActionAuthLoggedOut());
    });
  }
}


