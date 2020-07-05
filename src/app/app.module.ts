import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '@shared/shared.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthModule} from '@app/auth/auth.module';
import {CoreModule} from '@app/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CacheService} from '@shared/services';
import {WelcomeModule} from '@app/features/welcome/welcome.module';
import {FeaturesModule} from '@app/features/features.module';
import {environment} from '@env/environment';
import {AuthRoutingModule} from '@app/auth/auth-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {APP_CONFIG} from '@helpers/constants';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
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
    MatToolbarModule
  ],
  providers: [ CacheService,
    {
      provide: APP_CONFIG,
      useValue: {
        debounceTime: 600,
        snackDuration: 5000
      }
    },],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
