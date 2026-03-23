import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

// AngularFire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideDatabase, getDatabase, Database, ref, get } from '@angular/fire/database';

// ngx-translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@app/auth/auth.module';
import { CoreModule } from '@app/core';
import { FeaturesModule } from '@app/features/features.module';
import { WelcomeModule } from '@app/features/welcome/welcome.module';
import { mergeDeep } from '@app/core/firebase/app-config.repository';

/**
 * FirebaseTranslateLoader
 *
 * Charge d'abord le JSON statique (source de vérité), puis fusionne
 * les surcharges stockées dans Firebase (config/i18n/{lang}).
 * Si Firebase est vide ou inaccessible, le JSON statique est utilisé tel quel.
 */
class FirebaseTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient, private db: Database) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get<any>(`./assets/i18n/${lang}.json`).pipe(
      switchMap(staticData =>
        from(get(ref(this.db, `config/i18n/${lang}`))).pipe(
          map(snap => {
            const firebaseData = snap.val();
            if (!firebaseData) return staticData;
            return mergeDeep({}, staticData, firebaseData);
          }),
          catchError(() => of(staticData))
        )
      ),
      catchError(() => of({}))
    );
  }
}

export function FirebaseTranslateLoaderFactory(http: HttpClient, db: Database) {
  return new FirebaseTranslateLoader(http, db);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    SharedModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: FirebaseTranslateLoaderFactory,
        deps: [HttpClient, Database],
      },
    }),

    AuthModule,
    CoreModule,
    FeaturesModule,
    WelcomeModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
