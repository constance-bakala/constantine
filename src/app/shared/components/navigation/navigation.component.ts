import {Component, NgZone, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {TranslateService} from '@ngx-translate/core';

import {selectNbChosenItems} from '@app/features/store';
import {ActionAuthLoggedIn, ActionAuthLogout} from '@app/auth/store/auth.actions';
import {initLoginPayload} from '@helpers/common.services.utils';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  nbSelectedItems$: Observable<number>;

  constructor(
    public afAuth: AngularFireAuth,
    private store: Store<any>,
    public translate: TranslateService
  ) {
    // ✅ DÉCLARATION DES LANGUES DISPONIBLES
    this.translate.addLangs(['fr', 'en']);

    // langue par défaut
    this.translate.setDefaultLang('fr');

    // langue courante (persistée ou fallback)
    const savedLang = localStorage.getItem('lang');
    this.translate.use(savedLang || 'fr');

    this.nbSelectedItems$ = this.store.pipe(select(selectNbChosenItems));
  }

  ngOnInit(): void {
    // --- Bootstrap scrollspy + jQuery stuff
    $(document).ready(() => {
      /**
       * ✅ Fix Bootstrap ScrollSpy invalid selectors
       *
       * - ScrollSpy lit les <a> du target (#mainNav) et utilise leur href comme sélecteur CSS.
       * - Avec HashLocationStrategy, les routerLinks deviennent souvent "#/auth/signin" => invalide.
       * - Donc on neutralise tout ce qui est une route ("#/...") et on garde uniquement les ancres "#id".
       */
      $('#mainNav a').each(function () {
        const $a = $(this);
        const href = ($a.attr('href') || '').trim();

        if (!href) {
          return;
        }

        // Cas 1: "#/%23page-top" => "#page-top"
        if (href.startsWith('#/%23')) {
          $a.attr('href', '#' + href.substring(4));
          return;
        }

        // Cas 2: lien encodé du genre "#/%23..." après decodeURIComponent
        if (href.startsWith('#/')) {
          try {
            const decoded = decodeURIComponent(href);
            if (decoded.startsWith('#/%23')) {
              $a.attr('href', '#' + decoded.substring(4));
              return;
            }
          } catch {
            // ignore
          }

          // ✅ Cas IMPORTANT: "#/auth/signin", "#/shopping-cart", etc.
          // Ce ne sont PAS des ancres => on neutralise pour ScrollSpy
          $a.attr('href', '#');
          return;
        }

        // Cas 3: "/#page-top" => "#page-top"
        if (href.startsWith('/#')) {
          $a.attr('href', href.substring(1));
          return;
        }

        // Cas 4: "/auth/..." => pas une ancre
        if (href.startsWith('/')) {
          $a.attr('href', '#');
          return;
        }
      });

      // Smooth scrolling UNIQUEMENT pour les ancres "#id" (pas "#/route")
      $('a.js-scroll-trigger[href^="#"]:not([href="#"]):not([href^="#/"])').click(function () {
        if (
          location.pathname.replace(/^\//, '') == (this as any).pathname.replace(/^\//, '') &&
          location.hostname == (this as any).hostname
        ) {
          let target = $((this as any).hash);
          target = target.length ? target : $('[name=' + (this as any).hash.slice(1) + ']');

          if (target.length) {
            $('html, body').animate(
              {
                scrollTop: target.offset().top - 70,
              },
              1000,
              'easeInOutExpo'
            );
            return false;
          }
        }
        return true;
      });

      // Scroll to top button appear
      $(document).scroll(function () {
        const scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });

      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
      });

      // Activate scrollspy to add active class to navbar items on scroll
      $('body').scrollspy({
        target: '#mainNav',
        offset: 80,
      });

      // Collapse Navbar
      const navbarCollapse = function () {
        if ($('#mainNav').offset().top > 100) {
          $('#mainNav').addClass('navbar-shrink');
        } else {
          $('#mainNav').removeClass('navbar-shrink');
        }
      };

      navbarCollapse();
      $(window).scroll(navbarCollapse);

      // Floating label headings for the contact form
      $(function () {
        $('body')
          .on('input propertychange', '.floating-label-form-group', function (e: any) {
            $(this).toggleClass('floating-label-form-group-with-value', !!$(e.target).val());
          })
          .on('focus', '.floating-label-form-group', function () {
            $(this).addClass('floating-label-form-group-with-focus');
          })
          .on('blur', '.floating-label-form-group', function () {
            $(this).removeClass('floating-label-form-group-with-focus');
          });
      });
    });

    // --- ton init auth / store (inchangé)
    this.afAuth.authState.subscribe((authState) => {
      if (authState) {
        this.store.dispatch(new ActionAuthLoggedIn(initLoginPayload(authState)));
      }
    });
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
  }

  disconnect(): void {
    this.store.dispatch(new ActionAuthLogout());
  }
}
