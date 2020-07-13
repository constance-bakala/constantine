import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, CategoryInfos, ItemInfos} from '@shared/interfaces/image.interfaces';
import {MatDialog} from '@angular/material/dialog';
import {ItemDetailsComponent} from '@shared/components/item-details/item-details.component';
import {environment} from '@env/environment';

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
  categoryInfos: ExistingCategories;
  @Output() navigateAway: EventEmitter<string> = new EventEmitter();
  @Output() onToogleSelect: EventEmitter<ItemInfos> = new EventEmitter();
  @Output() updateBasketItem: EventEmitter<ItemInfos> = new EventEmitter();
  currentUri= '';
  currentEncodedUri= '';



  constructor(private dialog: MatDialog,) {
  }

  ngOnInit() {
    const protocol = window.location.protocol;
    this.currentUri = protocol + '//' + window.location.host;
    if (this.currentUri.indexOf('gitHub') > 0) {
      this.currentUri = this.currentUri +'/' + environment.appId;
    }
    this.currentEncodedUri = encodeURI(this.currentUri);
  }

  toogleSelect(selectedImage: ItemInfos) {
    this.onToogleSelect.emit(selectedImage);
  }

  gotoTarget(name: string) {
    this.navigateAway.emit(name);
  }

  openChoices(item: ItemInfos) {
    const dialogRef = this.dialog.open(ItemDetailsComponent, {
      panelClass: 'signin-dialog',
      maxHeight: '85vh',
      maxWidth: '70vw',
      disableClose: false,
      autoFocus: true,
      data: item,
    });
    dialogRef.componentInstance.updateBasketItem.subscribe(result => {
      this.updateBasketItem.emit(result);
    });
  }
}
