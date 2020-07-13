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

  fbshareCurrentPage() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href) + "&t=" + document.title, '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=auto');
    return false;
  }

  twshareCurrentPage() {
    window.open("https://twitter.com/share?url=" + encodeURIComponent(window.location.href) + "&text=" + document.title, '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=auto');
    return false;
  }
}
