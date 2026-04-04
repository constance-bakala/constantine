import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ITEM_SIZES, ItemInfos } from '@shared/interfaces';
import { PricingService } from '@shared/services/pricing.service';
import { StockService } from '@shared/services/stock.service';
import { SnackAlertComponent } from '@shared/components/snack-alert/snack-alert.component';

@Component({
  selector: 'app-cart-item-row',
  templateUrl: './cart-item-row.component.html',
  styleUrls: ['./cart-item-row.component.scss'],
  standalone: false,
})
export class CartItemRowComponent {
  @Input() itemGroup!: UntypedFormGroup;
  @Input() item!: ItemInfos;
  @Input() sizes = ITEM_SIZES;
  @Input() isOutOfStock = false;

  @Output() remove = new EventEmitter<void>();
  @Output() lightboxOpen = new EventEmitter<string>();

  constructor(
    public pricing: PricingService,
    private stockService: StockService,
    private snackBar: MatSnackBar,
  ) {}

  get itemTotal(): string {
    const price = this.pricing.getEffectiveEur(this.item.reference, this.item.price ?? 0);
    const qty = Number(this.itemGroup.get('quantity')?.value) || 1;
    return this.pricing.format(price * qty);
  }

  onStepDown(): void {
    const ctrl = this.itemGroup.get('quantity') as UntypedFormControl;
    ctrl.patchValue(Math.max(1, Number(ctrl.value) - 1));
  }

  onStepUp(): void {
    const ctrl = this.itemGroup.get('quantity') as UntypedFormControl;
    this.stockService.fetchAvailable(this.item.reference).subscribe(available => {
      const current = Number(ctrl.value) || 0;
      if (available > current) {
        ctrl.patchValue(current + 1);
      } else {
        this.snackBar.openFromComponent(SnackAlertComponent, {
          duration: 3000,
          data: { message: 'Stock insuffisant — quantité maximale atteinte.', type: 'error' },
          politeness: 'assertive',
        });
      }
    });
  }

  setSizeForItem(size: string): void {
    (this.itemGroup.get('size') as UntypedFormControl)?.setValue(size);
  }
}
