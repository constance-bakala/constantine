import {EMPTY, Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';

import {ActionAuthLogin, AuthState, selectorAuth} from '@app/auth/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../common.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  logging: FormGroup;
  loading = false;
  error: {
    code?: string;
    message: string;
  };
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<any>,
              private _fb: FormBuilder) {
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
    this.store.dispatch(
      new ActionAuthLogin({
        username: this.logging.value.username.trim(),
        password: this.logging.value.password
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
