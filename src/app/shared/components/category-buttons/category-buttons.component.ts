import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryInfos, ItemsCategoriesEnum} from '@shared/interfaces';
import {ExistingCategories} from '@shared/components/portfolio-list/portfolio-list.component';

@Component({
  selector: 'app-category-buttons',
  templateUrl: './category-buttons.component.html',
  styleUrls: ['./category-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryButtonsComponent implements OnInit {

  @Input()
  categoryToAvoid: ItemsCategoriesEnum;

  @Output() navigateAway: EventEmitter<string> = new EventEmitter();

  @Input()
  set categoryInfos(categories: ExistingCategories) {
    this._otherCategories = this.getOtherLinks(this.categoryToAvoid, categories);
  };

  _otherCategories: CategoryInfos[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getOtherLinks(name: ItemsCategoriesEnum, categoryInfos: ExistingCategories): CategoryInfos[] {
    return Object.keys(categoryInfos)
      .filter(key => key !== name?.toLowerCase())
      .map(targetKey => categoryInfos[targetKey]);
  }

  gotoTarget(name: ItemsCategoriesEnum) {
    this.navigateAway.emit(name.toLowerCase());
  }

}
