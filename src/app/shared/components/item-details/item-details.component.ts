import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ITEM_SIZES, ItemInfos, ItemSizeEnum } from '@shared/interfaces';
import { CatalogItem } from '@shared/interfaces/catalog.interfaces';
import { Store } from '@ngrx/store';
import { selectChosenItems } from '@app/features/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PricingService } from '@shared/services/pricing.service';
import { StockService } from '@shared/services/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackAlertComponent } from '@shared/components/snack-alert/snack-alert.component';
import { TranslateService } from '@ngx-translate/core';
import { CatalogRepository } from '@app/core/firebase/catalog.repository';
import { AppConfigRepository } from '@app/core/firebase/app-config.repository';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  standalone: false,
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  itemGroup!: UntypedFormGroup;
  sizes = ITEM_SIZES;
  images: string[] = [];
  selectedImageIndex = 0;
  lightboxSrc: string | null = null;
  complementaryItems: CatalogItem[] = [];
  complementaryLookTitle = 'Vos suggestions';
  cartRefs = new Set<string>();

  private titleSub = new Subscription();
  private cartSub = new Subscription();

  @Output() updateBasketItem: EventEmitter<ItemInfos> = new EventEmitter();
  selected = false;

  get isOutOfStock(): boolean {
    return this.stock.isOutOfStock(this.data.reference);
  }

  get currentImage(): string {
    return this.images[this.selectedImageIndex];
  }

  get totalPrice(): string {
    const qty = (this.itemGroup?.get('basketInfos.selectedQuantity')?.value as number) || 1;
    return this.pricing.format(this.data.price * qty);
  }

  get description(): string {
    const lang = this.translate.getCurrentLang();
    return (lang === 'en' ? this.data.descriptionEn : this.data.descriptionFr) ?? '';
  }

  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<ItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemInfos,
    public pricing: PricingService,
    public stock: StockService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private catalogRepo: CatalogRepository,
    private router: Router,
    private appConfig: AppConfigRepository,
    private store: Store<any>,
  ) {
    this.images = (data.images?.length ?? 0) > 0 ? data.images : [data.path];
    this.initForm(data);
  }

  ngOnInit(): void {
    const refs = this.data.complementaryItemRefs;
    if (refs?.length) {
      this.catalogRepo.getItemsById(refs).then(items => {
        this.complementaryItems = items.filter(i => i.published);
      });
    }

    const lang = this.translate.getCurrentLang() ?? 'fr';
    this.titleSub = this.appConfig.watchComplementaryLookTitle().subscribe(title => {
      this.complementaryLookTitle = (lang === 'en' && title.en) ? title.en : title.fr;
    });

    this.cartSub = this.store.select(selectChosenItems).subscribe(items => {
      this.cartRefs = new Set(items.map(i => i.reference));
    });
  }

  ngOnDestroy(): void {
    this.titleSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

  isCompInCart(ref: string): boolean {
    return this.cartRefs.has(ref);
  }

  goToComplementaryCategory(item: CatalogItem): void {
    this.dialogRef.close();
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

  private initForm(infos: ItemInfos) {
    this.selected = infos.selected;
    this.itemGroup = this.fb.group({
      path: [infos.path],
      selected: [infos.selected],
      reference: [infos.reference],
      index: [infos.index],
      category: [infos.category],
      loading: [false],
      basketInfos: this.fb.group({
        selectedQuantity: [infos.basketInfos?.selectedQuantity, Validators.required],
        selectedSize: [infos.basketInfos?.selectedSize ?? ItemSizeEnum.M, Validators.required],
        selectedModel: [infos.basketInfos?.selectedModel ?? '', Validators.required],
      })
    });

    this.itemGroup.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(() => {
      this.selected = false;
    });

  }

  stepUp() {
    this.stock.fetchAvailable(this.data.reference).subscribe(available => {
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

  stepDown() {
    const value = (this.itemGroup.get('basketInfos.selectedQuantity')?.value as number) || 0;
    if (value > 1) {
      this.itemGroup.get('basketInfos.selectedQuantity')!.setValue(value - 1);
    }
  }

  toogleSelect() {
    this.selected = !this.selected;
    if (this.selected) {
      this.updateBasketItem.emit({
        ...this.itemGroup.getRawValue(),
        selected: true
      });
    } else {
      this.updateBasketItem.emit({
        ...this.data,
        selected: false
      });
    }
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
      Math.round((item.priceXAF / 655.96) * 100) / 100,
      item.descriptionFr,
      item.descriptionEn,
      item.tryonUrl,
      item.complementaryItemRefs,
    );
    this.updateBasketItem.emit(itemInfos);
    this.snackBar.openFromComponent(SnackAlertComponent, {
      duration: 2500,
      data: { message: `${item.reference} ajouté au panier.`, type: 'success' },
      politeness: 'polite',
    });
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
    const price = this.pricing.format(this.data.price);
    const desc = this.description;
    const shopUrl = 'https://delice-eternel-gabon.web.app';

    const text = lang === 'en'
      ? `🛍️ *Délice Éternel* — African fashion, Libreville (Gabon)\n\n*REF: ${reference}*\n💰 ${price}${desc ? '\n\n' + desc : ''}\n\n👉 Visit our shop: ${shopUrl}`
      : `🛍️ *Délice Éternel* — Mode africaine, Libreville (Gabon)\n\n*REF: ${reference}*\n💰 ${price}${desc ? '\n\n' + desc : ''}\n\n👉 Voir la boutique : ${shopUrl}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  close() {
    this.dialogRef.close();
  }

}
