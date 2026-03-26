import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Category, CategoryInfos, ItemInfos } from '@shared/interfaces/image.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ItemDetailsComponent } from '@shared/components/item-details/item-details.component';
import { PricingService } from '@shared/services/pricing.service';
import { StockService } from '@shared/services/stock.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PromoCodeRepository } from '@app/core/firebase/promo-code.repository';

export type ExistingCategories = Record<string, CategoryInfos>;

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PortfolioListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() category!: Category;
  @Input() categoryInfos!: ExistingCategories;
  @Output() navigateAway: EventEmitter<string> = new EventEmitter();
  @Output() onToogleSelect: EventEmitter<ItemInfos> = new EventEmitter();
  @Output() updateBasketItem: EventEmitter<ItemInfos> = new EventEmitter();

  @ViewChild('sentinel') private sentinelRef!: ElementRef<HTMLDivElement>;

  currentEncodedUri = '';
  currentLang = 'fr';
  lightboxSrc: string | null = null;
  hasActivePromo = false;
  visibleCount = 10;

  private subs = new Subscription();
  private observer: IntersectionObserver | null = null;

  constructor(
    private dialog: MatDialog,
    public pricing: PricingService,
    public stock: StockService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private promoRepo: PromoCodeRepository,
  ) {}

  ngOnInit() {
    this.currentEncodedUri = encodeURIComponent(window.location.href);
    this.currentLang = this.translate.currentLang ?? 'fr';

    this.subs.add(this.pricing.currency$.subscribe(() => this.cdr.markForCheck()));
    this.subs.add(this.translate.onLangChange.subscribe(({ lang }) => {
      this.currentLang = lang;
      this.cdr.markForCheck();
    }));
    this.subs.add(this.promoRepo.hasAnyActivePromo().subscribe(has => {
      this.hasActivePromo = has;
      this.cdr.markForCheck();
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.visibleCount = 10;
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.loadMore();
      }
    }, { rootMargin: '200px' });
    this.observer.observe(this.sentinelRef.nativeElement);
  }

  get visibleItems(): ItemInfos[] {
    return this.category.items.slice(0, this.visibleCount);
  }

  get hasMore(): boolean {
    return this.visibleCount < this.category.items.length;
  }

  loadMore(): void {
    if (this.hasMore) {
      this.visibleCount = Math.min(this.visibleCount + 10, this.category.items.length);
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
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
