import { Component, inject, OnInit } from '@angular/core';
import { routerTransition } from '@app/core';
import { Store } from '@ngrx/store';
import { AuthRefreshUserToken } from '@app/auth/store/auth.actions';
import { Auth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from '@shared/services/seo.service';
import { ThemeService } from './shared/services/theme.service';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { environment } from '@env/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'Délice éternel';

  readonly auth = inject(Auth);
  private readonly store = inject(Store<any>);
  readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);
  private readonly themeService = inject(ThemeService);

  constructor() {
    this.seo.init();
    this.themeService.init();

    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }

    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    this.translate.use(localStorage.getItem('lang') || 'fr');
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthRefreshUserToken());
  }
}
