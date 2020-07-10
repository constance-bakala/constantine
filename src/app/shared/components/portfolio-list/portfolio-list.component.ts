import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, CategoryInfos, ItemInfos, ItemsCategoriesEnum} from '@shared/interfaces/image.interfaces';

export interface ExistingCategories {
  earings: CategoryInfos;
  dresses: CategoryInfos;
  masks: CategoryInfos;
}

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListComponent implements OnInit {

  @Input() category: Category;

  @Input()
  set categoryInfos(categories: ExistingCategories) {
      this._otherCategories = this.getOtherLinks(this.category?.name, categories);
  };

  _otherCategories: CategoryInfos[];
  @Output() onToogleSelect: EventEmitter<ItemInfos> = new EventEmitter();
  @Output() navigateAway: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toogleSelect(selectedImage: ItemInfos) {
    this.onToogleSelect.emit(selectedImage);
  }

  gotoTarget(name: ItemsCategoriesEnum) {
    this.navigateAway.emit(name.toLowerCase());
  }

  getOtherLinks(name: ItemsCategoriesEnum, categoryInfos: ExistingCategories): CategoryInfos[] {
    return Object.keys(categoryInfos)
      .filter(key => key !== name.toLowerCase())
      .map(targetKey => categoryInfos[targetKey]);
  }
}
