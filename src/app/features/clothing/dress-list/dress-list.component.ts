import { Component, OnInit } from '@angular/core';
import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActionItemsRetrieve, ActionItemToogleSelect, selectDresses, selectEarings} from '@app/features/store';

@Component({
  selector: 'app-clothing-list',
  templateUrl: './dress-list.component.html',
  styleUrls: ['./dress-list.component.css']
})
export class DressListComponent implements OnInit {
  dresses$: Observable<Category>;
  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.DRESSES}));
    this.dresses$ = this.store.pipe(select(selectDresses));
  }

  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

}
