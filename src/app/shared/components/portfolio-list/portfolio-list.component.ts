import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Category, CategoryInfos, ItemInfos } from '@shared/interfaces/image.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ItemDetailsComponent } from '@shared/components/item-details/item-details.component';
import { PricingService } from '@shared/services/pricing.service';
import { StockService } from '@shared/services/stock.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
export class PortfolioListComponent implements OnInit, OnDestroy {

  @Input() category!: Category;
  @Input() categoryInfos!: ExistingCategories;
  @Output() navigateAway: EventEmitter<string> = new EventEmitter();
  @Output() onToogleSelect: EventEmitter<ItemInfos> = new EventEmitter();
  @Output() updateBasketItem: EventEmitter<ItemInfos> = new EventEmitter();

  currentEncodedUri = '';
  currentLang = 'fr';
  lightboxSrc: string | null = null;

  private subs = new Subscription();

  constructor(
    private dialog: MatDialog,
    public pricing: PricingService,
    public stock: StockService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.currentEncodedUri = encodeURIComponent(window.location.href);
    this.currentLang = this.translate.currentLang ?? 'fr';

    this.subs.add(this.pricing.currency$.subscribe(() => this.cdr.markForCheck()));
    this.subs.add(this.translate.onLangChange.subscribe(({ lang }) => {
      this.currentLang = lang;
      this.cdr.markForCheck();
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get summary(): string {
    if (this.currentLang === 'en' && this.category.summaryEn) {
      return this.category.summaryEn;
    }
    return this.category.summary ?? '';
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

  closeLightbox(): void {
    this.lightboxSrc = null;
    this.cdr.markForCheck();
  }
}
