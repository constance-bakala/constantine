import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {select, Store} from '@ngrx/store';
import {ActionItemsRetrieve, ActionItemToogleSelect, selectExistingCategory, selectMasks} from '@app/features/store';
import {Go} from '@app/auth/store';
import {ExistingCategories} from '@shared/components/portfolio-list/portfolio-list.component';

@Component({
  selector: 'app-masks-list',
  templateUrl: './masks-list.component.html',
  styleUrls: ['./masks-list.component.css']
})
export class MasksListComponent implements OnInit {
  masks$: Observable<Category>;
  categoryInfos$: Observable<ExistingCategories>;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.MASKS}));
    this.masks$ = this.store.pipe(select(selectMasks));
    this.categoryInfos$ = this.store.pipe(select(selectExistingCategory));
  }

  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

  navigateToCategory(name: string) {
    this.store.dispatch(new Go({path: ['/' + name]}));
  }

}
