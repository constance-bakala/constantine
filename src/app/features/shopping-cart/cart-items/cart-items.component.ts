import {Component, OnInit} from '@angular/core';
import {
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
  ItemSizeEnum,
  selectChosenItems,
  selectNbChosenItems
} from '@app/features/store';
import {ItemInfos} from '@shared/interfaces';
import {select, Store} from '@ngrx/store';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  basketFormGroup: FormGroup;
  nbSelectedItems$: Observable<number>;
  sizes: {
    value: ItemSizeEnum;
    label: string;
  }[] = [{
    value: ItemSizeEnum.S,
    label: 'S'
  }, {
    value: ItemSizeEnum.M,
    label: 'M'
  }, {
    value: ItemSizeEnum.L,
    label: 'L'
  }, {
    value: ItemSizeEnum.XL,
    label: 'XL'
  }];

  constructor(private store: Store<any>, private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.nbSelectedItems$ = this.store.pipe(
      select(selectNbChosenItems)
    );

    this.store.pipe(select(selectChosenItems))
      .subscribe((items: ItemInfos[]) => {
        if (!!items) {
          this.initFormArray(items);
        }
      });
  }

  get basketItemsArray(): FormArray {
    return this.basketFormGroup.get('basketItems') as FormArray;
  }

  initFormArray(items: ItemInfos[]) {
    this.basketFormGroup = this.fb.group({
      basketItems: this.fb.array([])
    });
    const basketItems = this.basketFormGroup.get('basketItems') as FormArray;
    items.forEach(item => {
      basketItems.push(this.initBasketItemGroup(item));
    });
  }

  initBasketItemGroup(itemInfos: ItemInfos): FormGroup {
    const group = this.fb.group({
      size: [itemInfos.basketInfos?.selectedSize ?? ItemSizeEnum.M, Validators.required],
      quantity: [itemInfos.basketInfos?.selectedQuantity, Validators.required],
      path: [itemInfos.path, Validators.required],
      selected: [itemInfos.selected, Validators.required],
      reference: [itemInfos.reference, Validators.required],
      index: [itemInfos.index, Validators.required],
      category: [itemInfos.category, Validators.required],
      model: [itemInfos.basketInfos?.selectedModel ?? '', Validators.required],
    });

    group.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(() => {
      this.store.dispatch(new ActionUpdateBasketItem(group.getRawValue()))
    });
    return group
  }


  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

  stepDown(index: number) {
    const value: number = this.getItemQuantity(index).value;
    if (value > 1) {
      this.getItemQuantity(index).patchValue(value - 1);
    } else {
      this.getItemQuantity(index).patchValue(1);
    }
  }

  stepUp(index: number) {
    const value: number = +this.getItemQuantity(index).value;
    if (value < 999) {
      this.getItemQuantity(index).patchValue(value + 1);
    } else {
      this.getItemQuantity(index).patchValue(1000);
    }
  }

  getItemQuantity(index: number): FormControl {
    return this.basketItemsArray.controls[index].get('quantity') as FormControl;

  }
}
