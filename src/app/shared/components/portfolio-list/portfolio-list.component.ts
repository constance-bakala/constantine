import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, ItemInfos} from '@shared/interfaces/image.interfaces';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListComponent implements OnInit {

  @Input() category: Category;
  @Output() onToogleSelect: EventEmitter<ItemInfos> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toogleSelect(selectedImage: ItemInfos) {
    this.onToogleSelect.emit(selectedImage);
  }

}
