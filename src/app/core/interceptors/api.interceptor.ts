import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment as env} from '@env/environment';
import {ENV_TYPES} from '@env/environment.common';
import {IAppConfig} from '@shared/interfaces/app.interfaces';
import {APP_CONFIG, TECHNICAL_EXCEPTION_MSG} from '@helpers/constants';
import {ActionAuthLoggedOut} from '@app/auth/store/auth.actions';
import {AuthState} from '@app/auth/store';
import {selectorAuth} from '@app/auth/store/auth.selectors';

@Injectable()
export class XTokenInterceptor implements HttpInterceptor {
  readonly snackBarDuration: number;
  private X_TOKEN: string = null;
  private API_PREFIX = '/api';

  constructor(private store: Store<any>,
              private snackbar: MatSnackBar,
              @Inject(APP_CONFIG) appConfig: IAppConfig) {
    this.snackBarDuration = appConfig.snackDuration;

    this.store.pipe(
      select(selectorAuth)
    ).subscribe((state: AuthState) => {
      if (state) {
        this.X_TOKEN = state?.user?.token;
      } else {
        this.X_TOKEN = null;
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {};

    if (this.X_TOKEN) {
      headers['X-AUTH-TOKEN'] = this.X_TOKEN;
    }

    return next
      .handle(
        req.clone({
          url: `${this.API_PREFIX}${req.url}`,
          setHeaders: headers
        })
      )
      .pipe(
        tap(
          () => {
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              switch (err.status) {
                case 401:
                  this.store.dispatch(new ActionAuthLoggedOut());
                  break;
                case 500:
                  if (env && env.envName !== ENV_TYPES.PROD) {
                    this.snackbar.open(TECHNICAL_EXCEPTION_MSG, '', {
                      duration: this.snackBarDuration
                    });
                  }
                  break;
              }
            }
          }
        )
      );
  }
}
