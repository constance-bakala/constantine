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
  categoryInfos : ExistingCategories;
  @Output() navigateAway: EventEmitter<string> = new EventEmitter();
  @Output() onToogleSelect: EventEmitter<ItemInfos> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toogleSelect(selectedImage: ItemInfos) {
    this.onToogleSelect.emit(selectedImage);
  }

  gotoTarget(name: string) {
    this.navigateAway.emit(name);
  }
}
