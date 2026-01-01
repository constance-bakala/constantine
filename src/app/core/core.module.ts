import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {provideNgxMask} from 'ngx-mask';

import {environment} from '@env/environment';
import {AuthService} from '@shared/services/api/auth.service';
import {debug} from './meta-reducers/debug.reducer';
import {initStateFromLocalStorage} from './meta-reducers/init-state-from-local-storage.reducer';
import {LocalStorageService} from './local-storage/local-storage.service';
import {XTokenInterceptor} from '@app/core/interceptors';
import {AssetsInterceptor} from '@app/core/interceptors/assets.interceptor';
import {AuthEffects, authReducer, metaReducer, RouterEffects} from '@app/auth/store';
import {functionalErrorsReducer} from '@app/auth/store/errors.reducer';
import {CacheService} from "@shared/services";
import {APP_CONFIG} from "@helpers/constants";

export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

if (!environment.production) {
  metaReducers.unshift(debug);
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    // ngrx
    StoreModule.forRoot({
      'core:auth:constantine': authReducer,
      meta: metaReducer,
      functionalErrors: functionalErrorsReducer,
    }, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: false,
      },
    }),
    EffectsModule.forRoot([AuthEffects, RouterEffects]),
    // Instrumentation must be imported after importing StoreModule
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })],
  providers: [
    CacheService,
    {
      provide: APP_CONFIG,
      useValue: {
        debounceTime: 600,
        snackDuration: 5000
      }
    },
    LocalStorageService,
    AuthService,
    // ngx-mask (Angular 16+)
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AssetsInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
