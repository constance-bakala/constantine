import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, CategoryInfos, ItemInfos } from '@shared/interfaces/image.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ItemDetailsComponent } from '@shared/components/item-details/item-details.component';
import { environment } from '@env/environment';
import { PricingService } from '@shared/services/pricing.service';

export interface ExistingCategories {
  earings: CategoryInfos;
  dresses: CategoryInfos;
  masks: CategoryInfos;
}

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PortfolioListComponent implements OnInit {

  @Input() category!: Category;
  @Input()
  categoryInfos!: ExistingCategories;
  @Output() navigateAway: EventEmitter<string> = new EventEmitter();
  @Output() onToogleSelect: EventEmitter<ItemInfos> = new EventEmitter();
  @Output() updateBasketItem: EventEmitter<ItemInfos> = new EventEmitter();
  currentUri = '';
  currentEncodedUri = '';


  constructor(private dialog: MatDialog, public pricing: PricingService) {
  }

  ngOnInit() {
    this.currentEncodedUri = encodeURIComponent(window.location.href);
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
      disableClose: false,
      autoFocus: true,
      data: item,
    });
    dialogRef.componentInstance.updateBasketItem.subscribe(result => {
      this.onToogleSelect.emit(result);
      this.updateBasketItem.emit(result);
    });
  }
}
