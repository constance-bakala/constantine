import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {Auth, signOut, user} from '@angular/fire/auth';

import {selectNbChosenItems} from '@app/features/store';
import {ActionAuthLoggedIn, ActionAuthLogout} from '@app/auth/store/auth.actions';
import {initLoginPayload} from '@helpers/common.services.utils';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT_LOCALE_ID} from '@helpers/constants';

import { User } from 'firebase/auth';

declare const $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: false,
})
export class NavigationComponent implements OnInit, OnDestroy {
  nbSelectedItems$!: Observable<number>;
  private readonly subs = new Subscription();

  user$: Observable<User | null>;

  constructor(
    private store: Store<any>,
    private ngZone: NgZone,
    private auth: Auth,
    public translate: TranslateService
  ) {
    this.user$ = user(this.auth);
    // 🌍 i18n
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    this.translate.use(localStorage.getItem('lang') || DEFAULT_LOCALE_ID || 'fr');
  }

  ngOnInit(): void {
    this.nbSelectedItems$ = this.store.pipe(select(selectNbChosenItems));

    // 🔐 Firebase auth state (AngularFire v17)
    this.subs.add(
      user(this.auth).subscribe((firebaseUser) => {
        if (firebaseUser) {
          this.store.dispatch(new ActionAuthLoggedIn(initLoginPayload(firebaseUser)));
        }
      })
    );

    // --- Bootstrap / jQuery (optionnel)
    // ScrollSpy de Bootstrap appelle querySelector sur les href des <a>.
    // Avec le hash-routing Angular, des href "#/auth/..." cassent querySelector -> crash.
    $(document).ready(() => {
      // Neutralise toutes les ancres "#/route" avant d'activer scrollspy
      document
        .querySelectorAll<HTMLAnchorElement>('a[href^="#/"]')
        .forEach((a) => a.setAttribute('href', '#'));

      // Active scrollspy uniquement si on a des ancres internes "#section"
      const hasInPageAnchors = !!document.querySelector(
        'a[href^="#"]:not([href="#"]):not([href^="#/"])'
      );

      if (hasInPageAnchors) {
        $('body').scrollspy({
          target: '#mainNav',
          offset: 80,
        });
      }

      // Ferme le menu responsive quand on clique sur un lien "scroll"
      $('.js-scroll-trigger').on('click', () => {
        $('.navbar-collapse').collapse('hide');
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
