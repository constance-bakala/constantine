import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

const SITE_URL = 'https://delice-eternel-gabon.web.app';
const DEFAULT_TITLE = 'Délice Éternel – Couturière & Mode Africaine | Robes, Bijoux, Pagnes | Libreville Gabon';
const DEFAULT_DESC  = 'Couturière à Libreville, Gabon. Robes africaines sur mesure, pagnes wax, bijoux artisanaux, vêtements homme femme enfant. Livraison mondiale.';

@Injectable({ providedIn: 'root' })
export class SeoService {

  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  init(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) { route = route.firstChild; }
        return route.snapshot.data;
      })
    ).subscribe(data => {
      const title = data['seoTitle'] || DEFAULT_TITLE;
      const desc  = data['seoDesc']  || DEFAULT_DESC;
      const url   = SITE_URL + this.router.url;

      this.titleService.setTitle(title);
      this.meta.updateTag({ name: 'description',        content: desc });
      this.meta.updateTag({ property: 'og:title',       content: title });
      this.meta.updateTag({ property: 'og:description', content: desc });
      this.meta.updateTag({ property: 'og:url',         content: url });
    });
  }
}
