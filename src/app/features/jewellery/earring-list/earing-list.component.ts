import {Component, OnInit} from '@angular/core';
import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {select, Store} from '@ngrx/store';
import {ActionItemsRetrieve, ActionItemToogleSelect, selectEarings, selectExistingCategory} from '@app/features/store';
import {Observable} from 'rxjs';
import {ExistingCategories} from '@shared/components/portfolio-list/portfolio-list.component';
import {Go} from '@app/auth/store';

@Component({
  selector: 'app-jewellery-list',
  templateUrl: './earing-list.component.html',
  styleUrls: ['./earing-list.component.css']
})
export class EaringListComponent implements OnInit {
  earings$: Observable<Category>;
  categoryInfos$: Observable<ExistingCategories>;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.EARINGS}));
    this.earings$ = this.store.pipe(select(selectEarings));
    this.categoryInfos$ = this.store.pipe(select(selectExistingCategory));
  }

  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

  navigateToCategory(name: string) {
    this.store.dispatch(new Go({path: ['/' + name]}))
  }
}
