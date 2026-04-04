import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ITEM_SIZES, ItemInfos, ItemSizeEnum } from '@shared/interfaces';
import { CatalogItem } from '@shared/interfaces/catalog.interfaces';
import { selectChosenItems } from '@app/features/store';
import {
  CatalogLoadItemsForCategory,
  selectItemsByCategory,
} from '@app/features/store/catalog';
import {
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
} from '@app/features/store/items.actions';
import { PricingService } from '@shared/services/pricing.service';
import { StockService } from '@shared/services/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackAlertComponent } from '@shared/components/snack-alert/snack-alert.component';
import { TranslateService } from '@ngx-translate/core';
import { CatalogRepository } from '@app/core/firebase/catalog.repository';
import { AppConfigRepository } from '@app/core/firebase/app-config.repository';

const EUR_TO_XAF = 655.96;

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: [
    '../../../shared/components/item-details/item-details.component.scss',
    './item-page.component.scss',
  ],
  standalone: false,
})
export class ItemPageComponent implements OnInit, OnDestroy {
  data: ItemInfos | null = null;
  itemGroup!: UntypedFormGroup;
  sizes = ITEM_SIZES;
  images: string[] = [];
  selectedImageIndex = 0;
  lightboxSrc: string | null = null;
  complementaryItems: CatalogItem[] = [];
  complementaryLookTitle = 'Vos suggestions';
  cartRefs = new Set<string>();
  selected = false;
  prefix = '';

  private subs = new Subscription();

  get isOutOfStock(): boolean {
    return this.data ? this.stock.isOutOfStock(this.data.reference) : false;
  }

  get currentImage(): string {
    return this.images[this.selectedImageIndex] ?? '';
  }

  get totalPrice(): string {
    if (!this.data) return '';
    const qty = (this.itemGroup?.get('basketInfos.selectedQuantity')?.value as number) || 1;
    return this.pricing.format(this.data.price * qty);
  }

  get description(): string {
    if (!this.data) return '';
    const lang = this.translate.getCurrentLang();
    return (lang === 'en' ? this.data.descriptionEn : this.data.descriptionFr) ?? '';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>,
    private fb: UntypedFormBuilder,
    public pricing: PricingService,
    public stock: StockService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private catalogRepo: CatalogRepository,
    private appConfig: AppConfigRepository,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.params.pipe(
        switchMap(params => {
          this.prefix = params['prefix'];
          const reference: string = params['reference'];
          this.store.dispatch(new CatalogLoadItemsForCategory({ categoryId: this.prefix }));
          return combineLatest([
            this.store.select(selectItemsByCategory(this.prefix)),
            this.store.select(selectChosenItems),
          ]).pipe(
            map(([catalogItems, chosenItems]) => {
              this.cartRefs = new Set(chosenItems.map(i => i.reference));
              const catalogItem = catalogItems.find(i => i.reference === reference);
              if (!catalogItem) return null;
              return { catalogItem, reference };
            })
          );
        })
      ).subscribe(result => {
        if (!result) return;
        const { catalogItem, reference } = result;
        this.cartRefs = new Set([...this.cartRefs]);
        const isSelected = this.cartRefs.has(reference);

        if (!this.data) {
          this.data = new ItemInfos(
            catalogItem.coverUrl,
            isSelected,
            catalogItem.reference,
            0,
            this.prefix,
            false,
            { selectedQuantity: 1, selectedSize: ItemSizeEnum.M, selectedModel: 'MODEL_UNIQUE' },
            catalogItem.images?.length ? catalogItem.images : [catalogItem.coverUrl],
            Math.round((catalogItem.priceXAF / EUR_TO_XAF) * 100) / 100,
            catalogItem.descriptionFr,
            catalogItem.descriptionEn,
            catalogItem.tryonUrl,
            catalogItem.complementaryItemRefs,
          );
          this.selected = isSelected;
          this.images = (this.data.images?.length ?? 0) > 0 ? this.data.images : [this.data.path];
          this.initForm(this.data);

          if (catalogItem.complementaryItemRefs?.length) {
            this.catalogRepo.getItemsById(catalogItem.complementaryItemRefs).then(items => {
              this.complementaryItems = items.filter(i => i.published);
            });
          }
          const lang = this.translate.getCurrentLang() ?? 'fr';
          this.subs.add(this.appConfig.watchComplementaryLookTitle().subscribe(title => {
            this.complementaryLookTitle = (lang === 'en' && title.en) ? title.en : title.fr;
          }));
        } else {
          this.selected = isSelected;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private initForm(infos: ItemInfos): void {
    this.itemGroup = this.fb.group({
      path: [infos.path],
      selected: [infos.selected],
      reference: [infos.reference],
      index: [infos.index],
      category: [infos.category],
      loading: [false],
      basketInfos: this.fb.group({
        selectedQuantity: [infos.basketInfos?.selectedQuantity ?? 1, Validators.required],
        selectedSize: [infos.basketInfos?.selectedSize ?? ItemSizeEnum.M, Validators.required],
        selectedModel: [infos.basketInfos?.selectedModel ?? 'MODEL_UNIQUE', Validators.required],
      }),
    });

    this.itemGroup.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(() => {
      this.selected = false;
    });
  }

  isCompInCart(ref: string): boolean {
    return this.cartRefs.has(ref);
  }

  stepUp(): void {
    this.stock.fetchAvailable(this.data!.reference).subscribe(available => {
      const currentQty = (this.itemGroup.get('basketInfos.selectedQuantity')?.value as number) || 0;
      if (available > currentQty) {
        this.itemGroup.get('basketInfos.selectedQuantity')!.setValue(currentQty + 1);
      } else {
        this.snackBar.openFromComponent(SnackAlertComponent, {
          duration: 3000,
          data: { message: 'Stock insuffisant — quantité maximale atteinte.', type: 'error' },
          politeness: 'assertive',
        });
      }
    });
  }

  stepDown(): void {
    const value = (this.itemGroup.get('basketInfos.selectedQuantity')?.value as number) || 0;
    if (value > 1) {
      this.itemGroup.get('basketInfos.selectedQuantity')!.setValue(value - 1);
    }
  }

  toogleSelect(): void {
    this.selected = !this.selected;
    const item: ItemInfos = this.selected
      ? { ...this.itemGroup.getRawValue(), selected: true }
      : { ...this.data!, selected: false };
    this.store.dispatch(new ActionItemToogleSelect(item));
    this.store.dispatch(new ActionUpdateBasketItem(item));
  }

  addCompToCart(item: CatalogItem, event: MouseEvent): void {
    event.stopPropagation();
    const itemInfos = new ItemInfos(
      item.coverUrl,
      true,
      item.reference,
      0,
      item.categoryId ?? '',
      false,
      { selectedQuantity: 1, selectedSize: ItemSizeEnum.M, selectedModel: 'MODEL_UNIQUE' },
      item.images?.length ? item.images : [item.coverUrl],
      Math.round((item.priceXAF / EUR_TO_XAF) * 100) / 100,
      item.descriptionFr,
      item.descriptionEn,
      item.tryonUrl,
      item.complementaryItemRefs,
    );
    this.store.dispatch(new ActionUpdateBasketItem(itemInfos));
    this.snackBar.openFromComponent(SnackAlertComponent, {
      duration: 2500,
      data: { message: `${item.reference} ajouté au panier.`, type: 'success' },
      politeness: 'polite',
    });
  }

  goToComplementaryCategory(item: CatalogItem): void {
    this.router.navigate(['/category', item.categoryId]);
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  prevImage(): void {
    this.selectedImageIndex = (this.selectedImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage(): void {
    this.selectedImageIndex = (this.selectedImageIndex + 1) % this.images.length;
  }

  openLightbox(src?: string): void {
    this.lightboxSrc = src ?? this.currentImage;
  }

  closeLightbox(): void {
    this.lightboxSrc = null;
  }

  shareOnWhatsApp(): void {
    const lang = this.translate.getCurrentLang();
    const reference = this.itemGroup.get('reference')?.value ?? '';
    const price = this.pricing.format(this.data!.price);
    const desc = this.description;
    const shopUrl = 'https://delice-eternel-gabon.web.app';

    const text = lang === 'en'
      ? `🛍️ *Délice Éternel* — African fashion, Libreville (Gabon)\n\n*REF: ${reference}*\n💰 ${price}${desc ? '\n\n' + desc : ''}\n\n👉 Visit our shop: ${shopUrl}`
      : `🛍️ *Délice Éternel* — Mode africaine, Libreville (Gabon)\n\n*REF: ${reference}*\n💰 ${price}${desc ? '\n\n' + desc : ''}\n\n👉 Voir la boutique : ${shopUrl}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  goBack(): void {
    this.router.navigate(['/category', this.prefix]);
  }
}
