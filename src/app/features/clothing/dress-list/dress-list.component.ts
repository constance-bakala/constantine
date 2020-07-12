import {Component, OnInit} from '@angular/core';
import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  ActionItemsRetrieve,
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
  selectDresses,
  selectExistingCategory
} from '@app/features/store';
import {Go} from '@app/auth/store';
import {ExistingCategories} from '@shared/components/portfolio-list/portfolio-list.component';

@Component({
  selector: 'app-clothing-list',
  templateUrl: './dress-list.component.html',
  styleUrls: ['./dress-list.component.scss']
})
export class DressListComponent implements OnInit {
  dresses$: Observable<Category>;
  categoryInfos$: Observable<ExistingCategories>;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.DRESSES}));
    this.categoryInfos$ = this.store.pipe(select(selectExistingCategory));
    this.dresses$ = this.store.pipe(select(selectDresses));
  }

  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

  navigateToCategory(name: string) {
    this.store.dispatch(new Go({path: ['/' + name]}));
  }

  updateBasketItem(itemInfos: ItemInfos) {
    this.store.dispatch(new ActionUpdateBasketItem(itemInfos));
  }
}
