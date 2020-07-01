import {EMPTY, Subject} from 'rxjs';
import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectorAuth} from '@app/auth/store/auth.selectors';
import {AuthState} from '@app/auth/store';
import {ActionAuthLoggedIn, ActionAuthLogin} from '@app/auth/store/auth.actions';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {AngularFireFunctions} from '@angular/fire/functions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  logging: FormGroup;
  loading = false;
  error: {
    code?: string;
    message: string;
  };
  signInOptions = [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<any>,
              private _fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private ngZone: NgZone,
              private fun: AngularFireFunctions) {
    this.store
      .pipe(
        select(selectorAuth),
        takeUntil(this.unsubscribe$))
      .subscribe((state: AuthState) => {
        if (state) {
          if (state.error) {
            switch (state.error.status) {
              case 504:
              case 500:
                this.error = {
                  message:
                    'L\'authentification est indisponible pour le moment, veuillez réessayez'
                };
                break;
              default:
                this.error = state.error.error;
                break;
            }
          }
          this.loading = state.loading;
        }
      });
  }

  ngOnInit() {
    this.logging = this._fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    this.afAuth.signInWithEmailAndPassword(this.logging.value.username.trim(), this.logging.value.password)
      .then(result => {
        this.loading = false;
         this.store.dispatch(new ActionAuthLoggedIn({
           ssoToken: result?.user?.refreshToken,
            token: result?.user?.refreshToken,
            userHabilitations: [],
            indexRole: -1,
            actions: {},
            other: result,
            additionalInfos: {
              id: result.user?.uid,
              providerId: result.additionalUserInfo?.providerId,
             // local: result.user?.oa,
              picture: result.user?.photoURL,
              nom: result.user.displayName,
              prenom: '',
              //gender: result.additionalUserInfo.profile?.gender,
              email: result.user?.email,
            }
          }));
        const callable = this.fun.httpsCallable('genericEmail');
        callable({
          text: 'Sending email with Angular and SendGrid is fun, you did it will!',
          subject: 'Email from delice eternel gabon'}
        ).subscribe(result => console.log(result));
      })
      .catch(error => {
        this.loading = false;
        this.error = error;
      });
  }

  sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification({url: ''})
         .then(function() {
           // Verification email sent.
         })
         .catch(function(error) {
           // Error occurred. Inspect error.code.
         });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
