import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ITEM_SIZES, ItemInfos, ItemSizeEnum } from '@shared/interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PricingService } from '@shared/services/pricing.service';
import { StockService } from '@shared/services/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackAlertComponent } from '@shared/components/snack-alert/snack-alert.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  standalone: false,
})
export class ItemDetailsComponent {
  itemGroup!: UntypedFormGroup;
  sizes = ITEM_SIZES;
  images: string[] = [];
  selectedImageIndex = 0;
  lightboxSrc: string | null = null;

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

  constructor(private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<ItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemInfos,
    public pricing: PricingService,
    private stock: StockService,
    private snackBar: MatSnackBar) {
    this.images = (data.images?.length ?? 0) > 0 ? data.images : [data.path];
    this.initForm(data);
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

  openLightbox(): void {
    this.lightboxSrc = this.currentImage;
  }

  closeLightbox(): void {
    this.lightboxSrc = null;
  }

  close() {
    this.dialogRef.close();
  }

}
