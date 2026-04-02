import { Component, NgZone } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Auth } from '@angular/fire/auth';
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  AuthProvider,
} from 'firebase/auth';
import { ActionAuthLoggedIn } from '@app/auth/store/auth.actions';
import { initLoginPayload } from '@helpers/common.services.utils';

const PROVIDER_LABELS: Record<string, string> = {
  'google.com':   'Google',
  'facebook.com': 'Facebook',
  'twitter.com':  'Twitter',
};

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: false,
})
export class ForgotPasswordComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  loading = false;
  success = false;
  error = '';
  socialProvider: string | null = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store<any>,
    private ngZone: NgZone,
  ) {}

  submit(): void {
    if (this.email.invalid) return;
    this.loading = true;
    this.error = '';
    this.socialProvider = null;

    const emailValue = (this.email.value ?? '').trim();

    fetchSignInMethodsForEmail(this.auth, emailValue)
      .then((methods) => {
        const socialMethod = methods.find(m => m !== 'password');
        if (socialMethod) {
          this.socialProvider = PROVIDER_LABELS[socialMethod] ?? socialMethod;
          return this.triggerSocialSignIn(socialMethod);
        } else if (methods.includes('password')) {
          return sendPasswordResetEmail(this.auth, emailValue).then(() => {
            this.loading = false;
            this.success = true;
          });
        } else {
          this.loading = false;
          this.error = 'Aucun compte associé à cette adresse e-mail.';
          return;
        }
      })
      .catch((err) => {
        this.loading = false;
        this.error = this.mapError(err.code);
      });
  }

  private triggerSocialSignIn(providerId: string): Promise<void> {
    const provider = this.buildProvider(providerId);
    if (!provider) {
      this.loading = false;
      this.error = 'Fournisseur non supporté.';
      return Promise.resolve();
    }

    return signInWithPopup(this.auth, provider)
      .then((result) => {
        this.loading = false;
        const payload = initLoginPayload(result);
        this.ngZone.run(() => {
          this.store.dispatch(new ActionAuthLoggedIn(payload));
        });
      })
      .catch((err) => {
        this.loading = false;
        this.socialProvider = null;
        if (err.code !== 'auth/popup-closed-by-user') {
          this.error = this.mapError(err.code);
        }
      });
  }

  private buildProvider(providerId: string): AuthProvider | null {
    switch (providerId) {
      case 'google.com':   return new GoogleAuthProvider();
      case 'facebook.com': return new FacebookAuthProvider();
      case 'twitter.com':  return new TwitterAuthProvider();
      default:             return null;
    }
  }

  private mapError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':    return 'Aucun compte associé à cette adresse e-mail.';
      case 'auth/invalid-email':     return 'Adresse e-mail invalide.';
      case 'auth/too-many-requests': return 'Trop de tentatives. Veuillez réessayer plus tard.';
      case 'auth/popup-blocked':     return 'La popup a été bloquée par le navigateur. Autorisez les popups et réessayez.';
      default:                       return 'Une erreur est survenue. Veuillez réessayer.';
    }
  }
}
