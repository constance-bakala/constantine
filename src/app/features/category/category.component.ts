import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
} from '@app/features/store/items.actions';
import { Category, ItemInfos, ItemSizeEnum, CategoryInfos } from '@shared/interfaces';
import { PortfolioData } from '@shared/interfaces/portfolio.interfaces';
import { ExistingCategories } from '@shared/components/portfolio-list/portfolio-list.component';
import { Go } from '@app/auth/store';
import {
  CatalogLoadItemsForCategory,
  selectItemsByCategory,
  selectPublishedCategories,
  selectCatalogState,
} from '@app/features/store/catalog';
import { AppConfigRepository } from '@app/core/firebase/app-config.repository';
import { TranslateService } from '@ngx-translate/core';

const EUR_TO_XAF = 655.96;
const DEFAULT_COVER = 'assets/style-sauvage_only_logo-removebg.png';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: false,
})
export class CategoryComponent implements OnInit, OnDestroy {
  category$!: Observable<Category | null>;
  categoryInfos$!: Observable<ExistingCategories>;
  complementaryItems$!: Observable<PortfolioData[]>;
  complementaryLookTitle = 'Vos suggestions';

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private appConfig: AppConfigRepository,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    // "VOIR AUSSI" : catégories recommandées par l'IA (relatedCategories) si configurées,
    // sinon toutes les catégories publiées sauf la courante.
    this.categoryInfos$ = combineLatest([
      this.store.select(selectPublishedCategories),
      this.route.params,
    ]).pipe(
      map(([published, params]) => {
        const currentPrefix: string = params['prefix'];
        const currentCat = published.find(c => c.prefix === currentPrefix);
        const related = currentCat?.relatedCategories;
        const result: Record<string, CategoryInfos> = {};
        published
          .filter(cat => cat.prefix !== currentPrefix)
          .filter(cat => !related?.length || related.includes(cat.prefix))
          .forEach(cat => {
            result[cat.prefix] = { name: cat.prefix as any, title: cat.title };
          });
        return result as any;
      })
    );

    // "COMPLÉTEZ LE LOOK" : catégories complémentaires définies par l'IA
    this.complementaryItems$ = combineLatest([
      this.store.select(selectPublishedCategories),
      this.store.select(selectCatalogState),
      this.route.params,
    ]).pipe(
      map(([published, catalogState, params]) => {
        const currentPrefix: string = params['prefix'];
        const currentCat = published.find(c => c.prefix === currentPrefix);
        // Section cachée si le toggle est désactivé
        if (!currentCat?.complementaryLookEnabled) return [];
        const complementaryPrefixes = currentCat?.complementaryCategories ?? [];
        if (!complementaryPrefixes.length) return [];

        // Déclenche le chargement des items pour les catégories complémentaires si besoin
        complementaryPrefixes.forEach(prefix => {
          if (!catalogState.itemsByCategory[prefix]) {
            this.store.dispatch(new CatalogLoadItemsForCategory({ categoryId: prefix }));
          }
        });

        return complementaryPrefixes
          .map(prefix => published.find(c => c.prefix === prefix))
          .filter((cat): cat is typeof published[0] => !!cat)
          .map(cat => {
            const items = catalogState.itemsByCategory[cat.prefix] ?? [];
            const imageUrls = items.map(i => i.coverUrl).filter(Boolean);
            return {
              portfolioLink: `/category/${cat.prefix}`,
              coverImageUrl: imageUrls[0] ?? DEFAULT_COVER,
              portfolioName: cat.title,
              portfolioNameEn: cat.titleEn,
              imageUrls: imageUrls.length > 0 ? imageUrls : [DEFAULT_COVER],
            } as PortfolioData;
          });
      })
    );

    this.category$ = this.route.params.pipe(
      switchMap(params => {
        const prefix: string = params['prefix'];

        this.store.dispatch(new CatalogLoadItemsForCategory({ categoryId: prefix }));

        return combineLatest([
          this.store.select(selectPublishedCategories),
          this.store.select(selectItemsByCategory(prefix)),
        ]).pipe(
          map(([categories, catalogItems]) => {
            const catMeta = categories.find(c => c.prefix === prefix);
            if (!catMeta) return null;
            return {
              // name = préfixe courant → utilisé par CategoryButtonsComponent pour s'exclure
              name:      prefix,
              title:     catMeta.title,
              summary:   catMeta.description   ?? '',
              summaryEn: catMeta.descriptionEn ?? '',
              items: catalogItems.map((item, index) => new ItemInfos(
                item.coverUrl,
                false,
                item.reference,
                index,
                prefix,
                false,
                { selectedQuantity: 1, selectedSize: ItemSizeEnum.M, selectedModel: 'MODEL_UNIQUE' },
                item.images?.length ? item.images : [item.coverUrl],
                Math.round((item.priceXAF / EUR_TO_XAF) * 100) / 100,
                item.descriptionFr,
                item.descriptionEn,
                item.tryonUrl,
                item.complementaryItemRefs,
              )),
            } as Category;
          })
        );
      })
    );

    // Titre "Vos suggestions" configurable dans Firebase
    this.subs.add(
      this.appConfig.watchComplementaryLookTitle().subscribe(title => {
        const lang = this.translate.getCurrentLang() ?? 'fr';
        this.complementaryLookTitle = (lang === 'en' && title.en) ? title.en : title.fr;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onToogleSelect(item: ItemInfos): void {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

  updateBasketItem(item: ItemInfos): void {
    this.store.dispatch(new ActionUpdateBasketItem(item));
  }

  /** CategoryButtonsComponent émet le préfixe directement (clé de categoryInfos) */
  gotoTarget(prefix: string): void {
    this.store.dispatch(new Go({ path: ['/category', prefix] }));
  }
}
