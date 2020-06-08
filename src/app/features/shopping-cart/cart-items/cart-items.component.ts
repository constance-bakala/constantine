import { Component, OnInit } from '@angular/core';
import {ActionItemsRetrieve, selectChosenItems, selectDresses} from '@app/features/store';
import {ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  selectedItems$: Observable<ItemInfos[]>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.DRESSES}));
    this.selectedItems$ = this.store.pipe(select(selectChosenItems));
  }

}
