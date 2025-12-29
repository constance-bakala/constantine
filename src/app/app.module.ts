import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';

import {environment} from '../environments/environment';

import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {getStorage, provideStorage} from '@angular/fire/storage';

import {SharedModule} from '@shared/shared.module';
import {AuthModule} from '@app/auth/auth.module';
import {FeaturesModule} from '@app/features/features.module';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CacheService} from "@shared/services";
import {WelcomeModule} from "@app/features/welcome/welcome.module";
import {APP_CONFIG} from "@helpers/constants";
import {AuthRoutingModule} from "@app/auth/auth-routing.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AuthModule,
    CoreModule,
    FeaturesModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    WelcomeModule,
    AuthRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [
    CacheService,
    {
      provide: APP_CONFIG,
      useValue: {
        debounceTime: 600,
        snackDuration: 5000
      }
    },
    // ✅ AngularFire moderne uniquement (Angular 17)
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
  ],

  exports: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
