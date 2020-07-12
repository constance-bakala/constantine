import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ITEM_SIZES, ItemInfos, ItemSizeEnum} from '@shared/interfaces';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent {
  itemGroup: FormGroup;
  sizes = ITEM_SIZES;

  @Output() updateBasketItem: EventEmitter<ItemInfos> = new EventEmitter();
  selected = false;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<ItemDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ItemInfos) {
    this.initForm(data);
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
    let value = this.itemGroup.get('basketInfos.selectedQuantity').value as number;
    if (value < 999) {
      this.itemGroup.get('basketInfos.selectedQuantity').setValue(++value);
    }
  }

  stepDown() {
    let value = this.itemGroup.get('basketInfos.selectedQuantity').value as number;
    if (value > 1) {
      this.itemGroup.get('basketInfos.selectedQuantity').setValue(--value)
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

  close() {
    this.dialogRef.close();
  }

}
