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

const firebaseConfig = {
  apiKey: "AIzaSyBLCfZxzkybYbWJSrJGllI3X9sYtS6VZgw",
  authDomain: "delice-eternel-gabon.firebaseapp.com",
  databaseURL: "https://delice-eternel-gabon.firebaseio.com",
  projectId: "delice-eternel-gabon",
  storageBucket: "delice-eternel-gabon.appspot.com",
  messagingSenderId: "528655916572",
  appId: "1:528655916572:web:73ef9aa553b17c49bdc9d9",
  measurementId: "G-ZWZRVSM0JL"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AuthModule,
    CoreModule,
    FeaturesModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    WelcomeModule,
  ],
  providers: [ CacheService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
