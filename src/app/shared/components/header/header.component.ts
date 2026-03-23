import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigRepository, CarouselSlide } from '@app/core/firebase/app-config.repository';

const DEFAULT_SLIDE: CarouselSlide[] = [
  { imageUrl: 'assets/style-sauvage_only_logo-removebg.png', alt: 'Délice Éternel' },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {

  displayHtml = true;
  slides: CarouselSlide[] = DEFAULT_SLIDE;

  private unsubscribe$ = new Subject<void>();
  private subs = new Subscription();

  constructor(
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private configRepo: AppConfigRepository,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        this.displayHtml = (event.snapshot.routeConfig?.path?.indexOf('home') ?? -1) >= 0;
      });

    // Carousel dynamique depuis Firebase (fallback statique si vide)
    this.subs.add(
      this.configRepo.watchCarousel().subscribe(firebaseSlides => {
        this.slides = firebaseSlides.length > 0 ? firebaseSlides : DEFAULT_SLIDE;
      })
    );

    // Titre de la page (onglet navigateur)
    this.subs.add(
      this.configRepo.watchAppTitle().subscribe(appTitle => {
        const lang = this.translate.currentLang ?? 'fr';
        const title = lang === 'en' ? appTitle.en : appTitle.fr;
        if (title) this.titleService.setTitle(title);
      })
    );

    this.subs.add(
      this.translate.onLangChange.subscribe(({ lang }) => {
        this.configRepo.watchAppTitle().subscribe(appTitle => {
          const title = lang === 'en' ? appTitle.en : appTitle.fr;
          if (title) this.titleService.setTitle(title);
        });
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.subs.unsubscribe();
  }
}
