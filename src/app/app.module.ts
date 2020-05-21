import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ClothingModule} from './clothing/clothing.module';
import {JewelleryModule} from './jewellery/jewellery.module';
import {MasksModule} from './masks/masks.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {SharedModule} from './shared/shared.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

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
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ClothingModule,
    JewelleryModule,
    MasksModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
