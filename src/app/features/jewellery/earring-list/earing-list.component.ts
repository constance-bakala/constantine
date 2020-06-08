import {Component, OnInit} from '@angular/core';
import {Category, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {select, Store} from '@ngrx/store';
import {ActionItemsRetrieve, ActionItemToogleSelect, selectEarings} from '@app/features/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-jewellery-list',
  templateUrl: './earing-list.component.html',
  styleUrls: ['./earing-list.component.css']
})
export class EaringListComponent implements OnInit {
  earings$: Observable<Category>;
  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.EARINGS}));
    this.earings$ = this.store.pipe(select(selectEarings));
  }

  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

}
