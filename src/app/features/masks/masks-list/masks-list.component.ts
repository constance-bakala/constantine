import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {select, Store} from '@ngrx/store';
import {ActionItemsRetrieve, ActionItemToogleSelect, selectEarings, selectMasks} from '@app/features/store';

@Component({
  selector: 'app-masks-list',
  templateUrl: './masks-list.component.html',
  styleUrls: ['./masks-list.component.css']
})
export class MasksListComponent implements OnInit {
  masks$: Observable<ItemInfos[]>;
  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.dispatch(new ActionItemsRetrieve({category: ItemsCategoriesEnum.MASKS}));
    this.masks$ = this.store.pipe(select(selectMasks));
  }

  onToogleSelect(item: ItemInfos) {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

}
