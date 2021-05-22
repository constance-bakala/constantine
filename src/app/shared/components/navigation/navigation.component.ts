import {Component, NgZone, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectNbChosenItems} from '@app/features/store';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActionAuthLoggedIn, ActionAuthLogout} from '@app/auth/store/auth.actions';
import {initLoginPayload} from '@helpers/common.services.utils';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT_LOCALE_ID} from '@helpers/constants';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  nbSelectedItems$: Observable<number>;
  param = {value: 'About'};

  constructor(private store: Store<any>, public afAuth: AngularFireAuth, private ngZone: NgZone,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    translate.use(DEFAULT_LOCALE_ID);
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 71)
            }, 1000, "easeInOutExpo");
            return false;
          }
        }
      });

      // Scroll to top button appear
      $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
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
        offset: 80
      });

      // Collapse Navbar
      var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-shrink");
        } else {
          $("#mainNav").removeClass("navbar-shrink");
        }
      };
      // Collapse now if page is not at top
      navbarCollapse();
      // Collapse the navbar when page is scrolled
      $(window).scroll(navbarCollapse);

      // Floating label headings for the contact form
      $(function () {
        $("body").on("input propertychange", ".floating-label-form-group", function (e) {
          $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function () {
          $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function () {
          $(this).removeClass("floating-label-form-group-with-focus");
        });
      });
    });

    this.nbSelectedItems$ = this.store.pipe(
      select(selectNbChosenItems)
    );

    // here we just refresh the token if user is authenticated
    this.afAuth.authState.subscribe(connectedUser => {
      // If the user is remotely connected
      if (!!connectedUser) {
        // We log the user anonymousely
        this.store.dispatch(new ActionAuthLoggedIn(initLoginPayload(connectedUser)));
      }
      if (!connectedUser) {
        //this.store.dispatch(new ActionAuthLogout());
      }
    });
  }

  disconnect() {
    this.ngZone.run(() => {
      this.afAuth.auth.signOut().then(() => this.store.dispatch(new ActionAuthLogout()));
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
