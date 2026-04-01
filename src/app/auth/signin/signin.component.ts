import { Subject } from 'rxjs';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, FormGroup, FormControl, Validators } from '@angular/forms';

import { selectorAuth } from '@app/auth/store/auth.selectors';
import { AuthState } from '@app/auth/store';
import { ActionAuthLoggedIn } from '@app/auth/store/auth.actions';

import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { Functions } from '@angular/fire/functions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: false,
})
export class SigninComponent implements OnInit, OnDestroy {

  // ── Login ──
  logging!: UntypedFormGroup;
  loading = false;
  error!: { code?: string; message: string };

  // ── Register ──
  registerForm!: FormGroup;
  registerLoading = false;
  registerError = '';
  registerSuccess = false;

  // ── Mode ──
  mode: 'login' | 'register' = 'login';

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<any>,
    private _fb: UntypedFormBuilder,
    private auth: Auth,
    private ngZone: NgZone,
    private fun: Functions,
  ) {
    this.store
      .pipe(select(selectorAuth), takeUntil(this.unsubscribe$))
      .subscribe((state: AuthState) => {
        if (!state) return;
        if (state.error) {
          switch (state.error.status) {
            case 504:
            case 500:
              this.error = { message: 'L\'authentification est indisponible pour le moment, veuillez réessayer' };
              break;
            default:
              this.error = state.error.error;
          }
        }
        this.loading = state.loading;
      });
  }

  ngOnInit() {
    this.logging = this._fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = new FormGroup({
      prenom: new FormControl('', Validators.required),
      nom:    new FormControl('', Validators.required),
      email:  new FormControl('', [Validators.required, Validators.email]),
      password:        new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  setMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.error = null!;
    this.registerError = '';
    this.registerSuccess = false;
  }

  // ── Connexion ────────────────────────────────────────────────────────────────

  signIn(): void {
    this.loading = true;
    signInWithEmailAndPassword(
      this.auth,
      (this.logging.value.username || '').trim(),
      this.logging.value.password,
    )
      .then((result) => {
        this.loading = false;
        this.ngZone.run(() => {
          this.store.dispatch(new ActionAuthLoggedIn({
            ssoToken: result?.user?.refreshToken,
            token: result?.user?.refreshToken,
            userHabilitations: [],
            indexRole: -1,
            isAnonymous: result.user?.isAnonymous,
            credential: (result as any).credential,
            actions: {},
            additionalInfos: {
              uid: result.user?.uid,
              providerId: getAdditionalUserInfo(result)?.providerId ?? undefined,
              picture: result.user?.photoURL ?? undefined,
              nom: result.user?.displayName ?? undefined,
              prenom: '',
              email: result.user?.email ?? undefined,
            },
          }));
        });
      })
      .catch((error) => {
        this.loading = false;
        this.error = error;
      });
  }

  // ── Inscription ──────────────────────────────────────────────────────────────

  canSubmitRegister(): boolean {
    const f = this.registerForm;
    return f.valid && f.get('password')?.value === f.get('confirmPassword')?.value;
  }

  signUp(): void {
    if (!this.canSubmitRegister()) return;
    this.registerLoading = true;
    this.registerError = '';

    const { prenom, nom, email, password } = this.registerForm.value;
    const displayName = `${prenom} ${nom.toUpperCase()}`;

    createUserWithEmailAndPassword(this.auth, email.trim(), password)
      .then(result => updateProfile(result.user, { displayName }).then(() => result))
      .then((result) => {
        this.registerLoading = false;
        this.registerSuccess = true;
        const user = this.auth.currentUser!;
        this.ngZone.run(() => {
          this.store.dispatch(new ActionAuthLoggedIn({
            ssoToken: user.refreshToken,
            token: user.refreshToken,
            userHabilitations: [],
            indexRole: -1,
            isAnonymous: false,
            credential: undefined,
            actions: {},
            additionalInfos: {
              uid: user.uid,
              providerId: 'password',
              picture: user.photoURL ?? undefined,
              nom: nom.toUpperCase(),
              prenom,
              email: user.email ?? undefined,
            },
          }));
        });
      })
      .catch((error) => {
        this.registerLoading = false;
        this.registerError = this.mapRegisterError(error.code);
      });
  }

  private mapRegisterError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': return 'Cette adresse e-mail est déjà utilisée.';
      case 'auth/invalid-email':        return 'Adresse e-mail invalide.';
      case 'auth/weak-password':        return 'Mot de passe trop faible (8 caractères minimum).';
      default:                          return 'Une erreur est survenue. Veuillez réessayer.';
    }
  }

  sendEmailVerification(): void {
    const user = this.auth.currentUser;
    if (!user) return;
    sendEmailVerification(user, { url: '' }).catch(console.error);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
