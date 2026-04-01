import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { PortfolioData } from '@shared/interfaces/portfolio.interfaces';
import {
  selectPublishedCategories,
  selectCatalogLoaded,
  selectCatalogState,
  CatalogLoadItemsForCategory,
} from '../store/catalog';

const DEFAULT_COVER = 'assets/style-sauvage_only_logo-removebg.png';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: false,
})
export class WelcomeComponent implements OnInit, OnDestroy {

  disposition = 'col-md-6 col-lg-4 mb-5';
  portfolioItems$!: Observable<PortfolioData[]>;

  private subs = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    // Déclencher le chargement des items pour chaque catégorie publiée (une seule fois par liste)
    this.subs.add(
      this.store.select(selectPublishedCategories).pipe(
        filter(cats => cats.length > 0),
        distinctUntilChanged((a, b) =>
          a.map(c => c.prefix).join(',') === b.map(c => c.prefix).join(',')
        )
      ).subscribe(categories => {
        categories.forEach(cat =>
          this.store.dispatch(new CatalogLoadItemsForCategory({ categoryId: cat.prefix }))
        );
      })
    );

    // Construire les cartes portfolio à partir du catalog store
    this.portfolioItems$ = combineLatest([
      this.store.select(selectCatalogLoaded),
      this.store.select(selectPublishedCategories),
      this.store.select(selectCatalogState),
    ]).pipe(
      map(([loaded, categories, catalogState]) => {
        if (!loaded) return [];
        return categories.map(cat => {
          const items = catalogState.itemsByCategory[cat.prefix] ?? [];
          const imageUrls = items.map(i => i.coverUrl).filter(Boolean);
          return {
            portfolioLink: `/category/${cat.prefix}`,
            coverImageUrl: imageUrls[0] ?? DEFAULT_COVER,
            portfolioName: cat.title,
            portfolioNameEn: cat.titleEn,
            imageUrls: imageUrls.length > 0 ? imageUrls : [DEFAULT_COVER],
          };
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
