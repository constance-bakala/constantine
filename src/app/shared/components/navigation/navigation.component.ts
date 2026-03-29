import { AfterViewInit, Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Auth, signOut, user } from '@angular/fire/auth';

import { selectNbChosenItems } from '@app/features/store';
import { ActionAuthLoggedIn, ActionAuthLogout } from '@app/auth/store/auth.actions';
import { initLoginPayload } from '@helpers/common.services.utils';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LOCALE_ID } from '@helpers/constants';
import { AppConfigRepository } from '@app/core/firebase/app-config.repository';

import { User } from 'firebase/auth';

import { initNavScroll, setActiveLink, scrollToSection } from '@helpers/nav-scroll.utils';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: false,
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  nbSelectedItems$!: Observable<number>;
  private readonly subs = new Subscription();
  private destroyNavScroll?: () => void;

  user$: Observable<User | null>;
  appTitle = '';
  showEmail = false;
  private appTitleFr = '';
  private appTitleEn = '';

  constructor(
    private store: Store<any>,
    private ngZone: NgZone,
    private auth: Auth,
    public translate: TranslateService,
    private configRepo: AppConfigRepository,
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

    this.subs.add(
      this.configRepo.watchAppTitle().subscribe(t => {
        this.appTitleFr = t.fr ?? '';
        this.appTitleEn = t.en ?? '';
        this.updateAppTitle(this.translate.currentLang ?? 'fr');
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe(({ lang }) => this.updateAppTitle(lang))
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.destroyNavScroll = initNavScroll();
    }, 0);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.destroyNavScroll?.();
  }

  private updateAppTitle(lang: string): void {
    const title = lang === 'en' ? this.appTitleEn : this.appTitleFr;
    this.appTitle = title || 'DÉLICE ÉTERNEL';
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  scrollTo(sectionId: string): void {
    setActiveLink(sectionId);
    scrollToSection(sectionId);
    this.closeMenu();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeMenu();
  }

  toggleEmail(): void {
    this.showEmail = !this.showEmail;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const nav = document.getElementById('mainNav');
    if (nav && !nav.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  closeMenu(): void {
    const navbar = document.getElementById('navbarResponsive');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    }
    this.showEmail = false;
  }

  disconnect(): void {
    this.closeMenu();
    this.ngZone.run(() => {
      signOut(this.auth).then(() => this.store.dispatch(new ActionAuthLogout()));
    });
  }
}
