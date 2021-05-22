import {filter, map, takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {environment} from '@env/environment';
import {EMAIL_REGEX} from '@shared/helpers/constants';
import {IQuestion, ISignup} from '@shared/interfaces';

import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {PasswordValidators} from '@shared/validators/password-validators';
import {Misc} from '@helpers/misc.class';
import {AuthSignup} from '@app/auth/store/auth.actions';
import {selectorAuthSignup} from '@app/auth/store/auth.selectors';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy, OnInit {
  title = 'Créer un compte';
  subtitle = 'Compléter les informations ci-dessous :';
  submitButtonText = 'Suivant';
  submittingButtonText = 'Création en cours...';
  userForm: FormGroup;
  isValidation = false;
  requiredAlert = 'Veuillez renseigner un';
  env = environment;
  loading = false;
  showSecretResp = false;
  questions: IQuestion[] = [];
  success = false;
  error: {
    code?: string;
    message: string;
  };
  retrieveUserError: HttpErrorResponse;
  user: ISignup;
  private unsubscribe$: Subject<void> = new Subject<void>();
  private token: string;
  private isFirstLoad = true;
  signInOptions = [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ];

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private store: Store<any>,
              private afAuth: AngularFireAuth) {
    this.store
      .pipe(
        select(selectorAuthSignup),
        takeUntil(this.unsubscribe$))
      .subscribe(state => {
        if (state) {
          this.loading = state.loading;

          if (this.isFirstLoad) {
            this.updateForm();
          }

          if (state.error) {
            this.error = state.error.error;
          } else {
            this.error = null;
          }
        }
      });
  }

  get gender(): AbstractControl {
    return this.userForm.get('gender');
  }

  get nom(): AbstractControl {
    return this.userForm.get('nom');
  }

  get prenom(): AbstractControl {
    return this.userForm.get('prenom');
  }

  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get password(): AbstractControl {
    return this.userForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.userForm.get('confirmPassword');
  }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.unsubscribe$),
      map(params => params.token),
      filter(token => token !== 'new')
    ).subscribe(token => {
      this.token = token;
      this.title = 'Création de compte';
      this.subtitle = 'Les champs ci-dessous sont obligatoires :';
      this.submitButtonText = 'Créer mon compte';
      this.submittingButtonText = 'Création en cours...';
      this.isValidation = true;
    });

    this.userForm = this.fb.group({
      gender: [1, Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(EMAIL_REGEX)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        PasswordValidators.passwordMatchAtLeastThreeConditions,
        PasswordValidators.passwordShouldBeMinimumChars
      ])],
      confirmPassword: ['', Validators.required],
    }, {
      validator: PasswordValidators.passwordsShouldMatch
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateForm() {
    this.userForm = this.fb.group({
      gender: [this.user.gender, Validators.required],
      nom: [this.user.nom, Validators.required],
      prenom: [this.user.prenom, Validators.required],
      email: [{value: this.user.email, disabled: true}],
      password: ['', Validators.compose([
        Validators.required,
        PasswordValidators.passwordMatchAtLeastThreeConditions,
        PasswordValidators.passwordShouldBeMinimumChars
      ])],
      confirmPassword: ['', Validators.required],
    }, {
      validator: PasswordValidators.passwordsShouldMatch
    });
  }

  sendButtonState(): boolean {
    return this.userForm.invalid || (this.password.value !== this.confirmPassword.value);
  }

  submit() {
    this.isFirstLoad = false;
    this.afAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    this.store.dispatch(new AuthSignup(this.buildSignupUser()));
  }

  buildSignupUser(): ISignup {
    return {
      gender: this.gender.value,
      nom: this.nom.value.toUpperCase(),
      prenom: Misc.toCapitalize(this.prenom.value),
      email: this.email.value,
      password: this.password.value,
    };
  }
}
