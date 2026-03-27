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
import { ExistingCategories } from '@shared/components/portfolio-list/portfolio-list.component';
import { Go } from '@app/auth/store';
import {
  CatalogLoadItemsForCategory,
  selectItemsByCategory,
  selectPublishedCategories,
} from '@app/features/store/catalog';

const EUR_TO_XAF = 655.96;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: false,
})
export class CategoryComponent implements OnInit, OnDestroy {
  category$!: Observable<Category | null>;
  categoryInfos$!: Observable<ExistingCategories>;

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
  ) {}

  ngOnInit(): void {
    // "VOIR AUSSI" : toutes les catégories publiées Firebase sauf la courante
    this.categoryInfos$ = combineLatest([
      this.store.select(selectPublishedCategories),
      this.route.params,
    ]).pipe(
      map(([published, params]) => {
        const currentPrefix: string = params['prefix'];
        const result: Record<string, CategoryInfos> = {};
        published
          .filter(cat => cat.prefix !== currentPrefix)
          .forEach(cat => {
            result[cat.prefix] = { name: cat.prefix as any, title: cat.title };
          });
        return result as any;
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
              )),
            } as Category;
          })
        );
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
