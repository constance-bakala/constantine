import {Subject} from 'rxjs';
import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';

import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {selectorAuth} from '@app/auth/store/auth.selectors';
import {AuthState} from '@app/auth/store';
import {ActionAuthLoggedIn} from '@app/auth/store/auth.actions';

import {Auth} from '@angular/fire/auth';
import {getAdditionalUserInfo, sendEmailVerification, signInWithEmailAndPassword} from 'firebase/auth';
import {Functions} from '@angular/fire/functions';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  logging: UntypedFormGroup;
  loading = false;
  error: { code?: string; message: string };

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<any>,
    private _fb: UntypedFormBuilder,
    private auth: Auth,
    private ngZone: NgZone,
    // Gardé si tu appelles des Cloud Functions plus tard
    private fun: Functions
  ) {
    this.store
      .pipe(select(selectorAuth), takeUntil(this.unsubscribe$))
      .subscribe((state: AuthState) => {
        if (!state) return;

        if (state.error) {
          switch (state.error.status) {
            case 504:
            case 500:
              this.error = {message: 'L\'authentification est indisponible pour le moment, veuillez réessayez'};
              break;
            default:
              this.error = state.error.error;
              break;
          }
        }
        this.loading = state.loading;
      });
  }

  ngOnInit() {
    this.logging = this._fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    this.loading = true;

    signInWithEmailAndPassword(
      this.auth,
      (this.logging.value.username || '').trim(),
      this.logging.value.password
    )
      .then((result) => {
        this.loading = false;
        this.ngZone.run(() => {
          this.store.dispatch(
            new ActionAuthLoggedIn({
              ssoToken: result?.user?.refreshToken,
              token: result?.user?.refreshToken,
              userHabilitations: [],
              indexRole: -1,
              isAnonymous: result.user?.isAnonymous,
              credential: (result as any).credential,
              actions: {},
              additionalInfos: {
                uid: result.user?.uid,
                providerId: getAdditionalUserInfo(result)?.providerId,

                picture: result.user?.photoURL,
                nom: result.user?.displayName,
                prenom: '',
                email: result.user?.email,
              }
            })
          );
        });
      })
      .catch((error) => {
        this.loading = false;
        this.error = error;
      });
  }

  sendEmailVerification() {
    const user = this.auth.currentUser;
    if (!user) return;

    sendEmailVerification(user, {url: ''}).catch(console.error);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  close() {
  }
}
