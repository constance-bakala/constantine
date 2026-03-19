import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Auth, signOut, user } from '@angular/fire/auth';

import { selectNbChosenItems } from '@app/features/store';
import { ActionAuthLoggedIn, ActionAuthLogout } from '@app/auth/store/auth.actions';
import { initLoginPayload } from '@helpers/common.services.utils';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LOCALE_ID } from '@helpers/constants';

import { User } from 'firebase/auth';

import { initNavScroll } from '@helpers/nav-scroll.utils';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: false,
})
export class NavigationComponent implements OnInit, OnDestroy {
  nbSelectedItems$!: Observable<number>;
  private readonly subs = new Subscription();
  private destroyNavScroll?: () => void;

  user$: Observable<User | null>;

  constructor(
    private store: Store<any>,
    private ngZone: NgZone,
    private auth: Auth,
    public translate: TranslateService
  ) {
    this.user$ = user(this.auth);
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    const supportedLangs = ['fr', 'en'];
    const savedLang = localStorage.getItem('lang');
    const browserLang = DEFAULT_LOCALE_ID;
    this.translate.use(
      supportedLangs.includes(savedLang!) ? savedLang! :
      supportedLangs.includes(browserLang) ? browserLang : 'fr'
    );
  }

  ngOnInit(): void {
    this.nbSelectedItems$ = this.store.pipe(select(selectNbChosenItems));

    this.subs.add(
      user(this.auth).subscribe((firebaseUser) => {
        if (firebaseUser) {
          this.store.dispatch(new ActionAuthLoggedIn(initLoginPayload(firebaseUser)));
        }
      })
    );

    this.destroyNavScroll = initNavScroll();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.destroyNavScroll?.();
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  disconnect(): void {
    this.ngZone.run(() => {
      signOut(this.auth).then(() => this.store.dispatch(new ActionAuthLogout()));
    });
  }
}
