import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store as NgRxStore } from '@ngrx/store';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import {
  ActionClearBasket,
  ActionItemToogleSelect,
  ActionUpdateBasketItem,
  ItemSizeEnum,
  selectChosenItems,
  selectExistingCategory,
  selectNbChosenItems,
} from '@app/features/store';

import { ITEM_SIZES, ItemInfos } from '@shared/interfaces';
import { ExistingCategories } from '@shared/components/portfolio-list/portfolio-list.component';

import { MatDialog } from '@angular/material/dialog';
import { AuthRepository } from '@app/core/firebase/auth.repository';
import { Go } from '@app/auth/store';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAppConfig } from '@shared/interfaces/app.interfaces';
import { APP_CONFIG } from '@helpers/constants';
import { SnackAlertComponent } from '@shared/components/snack-alert/snack-alert.component';
import { selectorConnectedUser } from '@app/auth/store/auth.selectors';
import { TranslateService } from '@ngx-translate/core';
import { PricingService } from '@shared/services/pricing.service';
import { StockService } from '@shared/services/stock.service';
import {
  ActionValidatePromoCode,
  ActionClearPromoCode,
  selectAppliedPromo,
  selectPromoValidationStatus,
} from '@app/features/store/promo';

import { PromoCodeService } from '@shared/services/promo-code.service';
import { BasketStorageService } from '@app/core/local-storage/basket-storage.service';
import { OrderService, BasketSnapshot, OrderStatusEntry } from '../services/order.service';
import { DeliveryStateService } from '../services/delivery-state.service';
import { CartState, EMPTY_ADDRESS, INITIAL_CART_STATE, ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from './cart-items.state';

// ── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  standalone: false,
})
export class CartItemsComponent implements OnInit, OnDestroy {

  state: CartState = { ...INITIAL_CART_STATE, shippingAddress: { ...EMPTY_ADDRESS } };

  // ── Infrastructure (non-state) ────────────────────────────────────────────
  basketFormGroup!: UntypedFormGroup;
  nbSelectedItems$!: Observable<number>;
  readonly sizes = ITEM_SIZES;

  readonly statusLabels = ORDER_STATUS_LABELS;
  readonly statusColors = ORDER_STATUS_COLORS;

  @Input() categoryInfos$!: Observable<ExistingCategories>;

  // ── Privé ─────────────────────────────────────────────────────────────────
  private readonly snackDuration: number;
  private firebaseBasketSnapshot: BasketSnapshot[] = [];
  private snapshotOrderId: string | null = null;
  private subs = new Subscription();
  private formSubs = new Subscription();
  private addressChange$ = new Subject<void>();

  constructor(
    private store: NgRxStore<any>,
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private basketStorage: BasketStorageService,
    private authRepository: AuthRepository,
    private orderService: OrderService,
    private deliveryStateService: DeliveryStateService,
    private promoCodeService: PromoCodeService,
    public pricing: PricingService,
    public stockService: StockService,
    @Inject(APP_CONFIG) appConfig: IAppConfig,
  ) {
    this.snackDuration = appConfig.snackDuration;
  }

  // ── Getters ───────────────────────────────────────────────────────────────

  get activeOrder(): OrderStatusEntry | null {
    return this.state.orderStatuses[0] ?? null;
  }

  get hasOutOfStockItems(): boolean {
    if (this.activeOrder) return false;
    return this.state.items.some(item => (this.state.stockByRef[item.reference] ?? 1) <= 0);
  }

  isItemOutOfStock(reference: string): boolean {
    if (this.activeOrder) return false;
    return (this.state.stockByRef[reference] ?? 1) <= 0;
  }

  get isShippingAddressValid(): boolean {
    const a = this.state.shippingAddress;
    return !!(a.firstName.trim() && a.lastName.trim() && a.address1.trim()
           && a.postalCode.trim() && a.city.trim() && a.country.trim() && a.phone.trim());
  }

  get isBasketUnchanged(): boolean {
    if (!this.activeOrder || !this.firebaseBasketSnapshot.length) return false;
    if (this.firebaseBasketSnapshot.length !== this.state.items.length) return false;
    return this.basketItemsArray.controls.every((group, i) => {
      const ref = this.state.items[i]?.reference;
      const snap = this.firebaseBasketSnapshot.find(s => s.reference === ref);
      if (!snap) return false;
      return snap.qty === (Number(group.get('quantity')?.value) || 1)
          && snap.size === group.get('size')?.value
          && snap.model === group.get('model')?.value;
    });
  }

  get canSend(): boolean {
    if (this.activeOrder && this.isBasketUnchanged) return false;
    if (this.state.deliveryMode === 'shipping') return this.isShippingAddressValid;
    if (this.state.deliveryMode === 'pickup') {
      if (this.state.pickupSubMode === 'courier') return this.state.courierAgreementChecked;
      return this.state.pickupSubMode === 'store';
    }
    return false;
  }

  get canGoToPayment(): boolean {
    if (!this.state.deliveryMode) return false;
    if (this.state.deliveryMode === 'pickup') {
      if (!this.state.pickupSubMode) return false;
      if (this.state.pickupSubMode === 'courier') return this.state.courierAgreementChecked;
      return true;
    }
    if (this.state.deliveryMode === 'shipping') return this.isShippingAddressValid;
    return false;
  }

  get promoDiscountRaw(): number {
    if (!this.state.appliedPromo) return 0;
    return this.pricing.formatRaw(
      this.promoCodeService.calculateDiscountEur(
        this.state.appliedPromo,
        this.state.items,
        (item: ItemInfos) => this.pricing.getEffectiveEur(item.reference, item.price ?? 0),
        (item: ItemInfos) => Number(this.getItemQuantity(this.state.items.indexOf(item))?.value) || 1,
      )
    );
  }

  get promoDiscountFormatted(): string {
    return this.promoDiscountRaw > 0 ? '−' + this.pricing.formatAmount(this.promoDiscountRaw) : '';
  }

  get shippingCostEur(): number | null {
    if (this.state.deliveryMode !== 'shipping') return null;
    const costXAF = this.activeOrder?.shippingCost;
    return typeof costXAF === 'number' ? costXAF / this.pricing.eurToXaf : null;
  }

  get cartTva(): string {
    return this.pricing.format(this.rawTotalHT * this.pricing.tvaRate);
  }

  get cartTotal(): string {
    const items = this.state.items.reduce((sum, item, i) => {
      const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
      return sum + this.pricing.formatRaw(price * (Number(this.getItemQuantity(i)?.value) || 1));
    }, 0);
    const tva      = this.pricing.formatRaw(this.rawTotalHT * this.pricing.tvaRate);
    const shipping = this.pricing.formatRaw(this.shippingCostEur ?? 0);
    return this.pricing.formatAmount(items + tva + shipping - this.promoDiscountRaw);
  }

  get itemLines(): { ref: string; qty: number; total: string }[] {
    return this.state.items.map((item, i) => ({
      ref: item.reference,
      qty: Number(this.getItemQuantity(i)?.value) || 1,
      total: this.getItemTotal(i),
    }));
  }

  get deliveryModeSummary(): string {
    if (!this.state.deliveryMode) return '';
    if (this.state.deliveryMode === 'pickup') {
      if (this.state.pickupSubMode === 'courier') return '🛵 Livraison à domicile';
      if (this.state.pickupSubMode === 'store') return '🏪 Retrait en magasin';
      return '🏠 Retrait';
    }
    return '✈️ Expédition internationale';
  }

  private get rawTotalHT(): number {
    return this.state.items.reduce((sum, item, i) => {
      const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
      return sum + price * (Number(this.getItemQuantity(i)?.value) || 1);
    }, 0);
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    const saved = this.deliveryStateService.restore();
    if (saved) {
      if (saved.deliveryMode)    this.state.deliveryMode    = saved.deliveryMode;
      if (saved.pickupSubMode)   this.state.pickupSubMode   = saved.pickupSubMode;
      if (saved.shippingAddress) this.state.shippingAddress = { ...this.state.shippingAddress, ...saved.shippingAddress };
    }

    this.subs.add(
      this.addressChange$.pipe(debounceTime(500)).subscribe(() => this.saveDeliveryState())
    );

    this.nbSelectedItems$ = this.store.pipe(select(selectNbChosenItems));
    this.categoryInfos$   = this.store.pipe(select(selectExistingCategory));

    this.subs.add(this.stockService.stockByRef$.subscribe(map => { this.state.stockByRef = map; }));

    this.subs.add(this.store.pipe(select(selectAppliedPromo)).subscribe(p => { this.state.appliedPromo = p; }));
    this.subs.add(
      this.store.pipe(select(selectPromoValidationStatus))
        .subscribe(s => { this.state.promoValidationStatus = s as typeof this.state.promoValidationStatus; })
    );

    this.basketFormGroup = this.fb.group({ basketItems: this.fb.array([]) });
    this.subs.add(
      this.store.pipe(
        select(selectChosenItems),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      ).subscribe((items: ItemInfos[]) => {
        if (!items) return;
        const sameStructure = this.state.items.length === items.length
          && this.state.items.every((item, i) => item.reference === items[i].reference);
        this.state.items = items;
        if (!sameStructure) this.initFormArray(items);
      })
    );

    this.subs.add(this.subscribeToOrderStatus());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.formSubs.unsubscribe();
  }

  // ── Form ──────────────────────────────────────────────────────────────────

  get basketItemsArray(): UntypedFormArray {
    return this.basketFormGroup.get('basketItems') as UntypedFormArray;
  }

  initFormArray(items: ItemInfos[]): void {
    this.formSubs.unsubscribe();
    this.formSubs = new Subscription();
    this.basketFormGroup.setControl('basketItems', this.fb.array([]));
    items.forEach(item => this.basketItemsArray.push(this.initBasketItemGroup(item)));
  }

  initBasketItemGroup(itemInfos: ItemInfos): UntypedFormGroup {
    const group = this.fb.group({
      size:      [itemInfos.basketInfos?.selectedSize  ?? ItemSizeEnum.M, Validators.required],
      quantity:  [itemInfos.basketInfos?.selectedQuantity ?? 1, [Validators.required, Validators.min(1)]],
      model:     [itemInfos.basketInfos?.selectedModel ?? '', Validators.required],
      path:      [itemInfos.path, Validators.required],
      selected:  [itemInfos.selected, Validators.required],
      reference: [itemInfos.reference, Validators.required],
      index:     [itemInfos.index, Validators.required],
      category:  [itemInfos.category, Validators.required],
    });

    this.formSubs.add(
      group.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      ).subscribe(() => {
        const updated: any = {
          ...group.getRawValue(),
          basketInfos: {
            selectedQuantity: group.get('quantity')?.value,
            selectedSize: group.get('size')?.value,
            selectedModel: group.get('model')?.value,
          },
        };
        delete updated.size;
        delete updated.quantity;
        delete updated.model;
        this.store.dispatch(new ActionUpdateBasketItem(updated));
      })
    );

    return group;
  }

  getItemQuantity(index: number): UntypedFormControl {
    return this.basketItemsArray.controls[index].get('quantity') as UntypedFormControl;
  }

  getItemTotal(index: number): string {
    const item = this.state.items[index];
    const price = this.pricing.getEffectiveEur(item.reference, item.price ?? 0);
    return this.pricing.format(price * (Number(this.getItemQuantity(index)?.value) || 1));
  }

  // ── Actions panier ────────────────────────────────────────────────────────

  onToogleSelect(item: ItemInfos): void {
    this.store.dispatch(new ActionItemToogleSelect(item));
  }

  // ── Livraison ─────────────────────────────────────────────────────────────

  toggleDeliveryMode(mode: 'pickup' | 'shipping'): void {
    if (this.state.deliveryMode === mode) {
      this.state.deliveryMode = null;
    } else {
      this.selectDeliveryMode(mode);
    }
  }

  togglePickupSubMode(mode: 'courier' | 'store'): void {
    if (this.state.pickupSubMode === mode) {
      this.state.pickupSubMode = null;
    } else {
      this.state.pickupSubMode = mode;
      this.state.courierAgreementChecked = false;
      this.saveDeliveryState();
    }
  }

  onShippingAddressChange(): void {
    this.addressChange$.next();
  }

  goToStep(n: number): void {
    this.state.checkoutStep = n;
    setTimeout(() => {
      const el = document.getElementById('checkout-top');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  // ── Envoi commande ────────────────────────────────────────────────────────

  sendCommand(): void {
    const currentUser = this.authRepository.getCurrentUser();

    if (!currentUser?.uid) {
      this.authRepository.signInAnonymously()
        .then(cred => { if (cred?.user) this.sendCommand(); else this.store.dispatch(new Go({ path: ['/auth/signin'] })); })
        .catch((e: any) => console.error(e));
      return;
    }

    const itemsToSend = this.basketItemsArray.controls.map((group, i) => ({
      ...this.state.items[i],
      price: this.pricing.getEffectiveEur(this.state.items[i].reference, this.state.items[i].price ?? 0),
      basketInfos: {
        selectedQuantity: Number(group.get('quantity')?.value) || 1,
        selectedSize: group.get('size')?.value,
        selectedModel: group.get('model')?.value,
      },
    }));

    if (!itemsToSend.length) {
      this.alertCommandNotSent(this.translateService.instant('COMMAND_ALREADY_EXIST'));
      return;
    }
    if (!this.state.deliveryMode) {
      this.alertCommandNotSent('Veuillez choisir un mode de livraison avant d\'envoyer votre commande.');
      return;
    }

    this.state.commendAllreadySent = true;

    this.subs.add(
      this.orderService.sendOrder({
        user: currentUser,
        itemsToSend,
        existingOrderId: this.activeOrder?.id ?? null,
        deliveryMode: this.state.deliveryMode,
        pickupSubMode: this.state.pickupSubMode,
        shippingAddress: this.state.shippingAddress,
        currency: this.pricing.currency,
        stockByRef: this.state.stockByRef,
        promoDiscountRaw: this.promoDiscountRaw,
        appliedPromo: this.state.appliedPromo,
      }).subscribe({
        next: result => {
          if (result.type === 'duplicate') {
            this.state.commendAllreadySent = false;
            this.alertCommandNotSent(this.translateService.instant('COMMAND_ALREADY_EXIST'));
          } else if (result.type === 'anonymous') {
            this.state.commendAllreadySent = false;
            this.alertCommandNotSent(this.translateService.instant('AUTHENTICATION_REQUIRED'));
          } else if (result.type === 'success') {
            if (result.isUpdate) this.state.commendAllreadySent = false;
            this.firebaseBasketSnapshot = result.newSnapshot;
            this.snackBar.openFromComponent(SnackAlertComponent, {
              duration: this.snackDuration,
              data: { message: 'COMMAND_SENT_MSG', type: 'success' },
              politeness: 'polite',
            });
          }
        },
        error: e => {
          console.error(e);
          this.state.commendAllreadySent = false;
        },
      })
    );
  }

  // ── Code promo ────────────────────────────────────────────────────────────

  applyPromoCode(): void {
    const rawCode = this.state.promoCodeInput.trim();
    if (!rawCode) return;
    this.store.dispatch(new ActionValidatePromoCode({ rawCode }));
  }

  clearPromoCode(): void {
    this.store.dispatch(new ActionClearPromoCode());
    this.state.promoCodeInput = '';
  }

  // ── Navigation / UI ───────────────────────────────────────────────────────

  gotoTarget(name: string): void {
    this.store.dispatch(new Go({ path: ['/category', name] }));
  }

  openLightbox(src: string): void { this.state.lightboxSrc = src; }
  closeLightbox(): void { this.state.lightboxSrc = null; }

  // ── Privé ─────────────────────────────────────────────────────────────────

  private subscribeToOrderStatus(): Subscription {
    return combineLatest([
      this.store.select(selectorConnectedUser) as Observable<any>,
      this.authRepository.watchAuthState(),
    ]).pipe(
      filter(([oldUser, newUser]) => !!oldUser && !!newUser),
      map(([oldUser, newUser]) => [oldUser, newUser] as const),
      distinctUntilChanged(([aOld, aNew], [bOld, bNew]) =>
        aOld?.additionalInfos?.uid === bOld?.additionalInfos?.uid && aNew?.uid === bNew?.uid
      ),
    ).subscribe(([oldUser, newUser]) => {
      if (!newUser?.uid) return;

      this.subs.add(
        this.orderService.watchOrderStatus(newUser.uid).subscribe(({ orders, rawById }) => {
          const prevIds = this.state.orderStatuses.map(o => o.id);
          const wasDeleted = prevIds.length > 0 && prevIds.some(id => !orders.find(o => o.id === id));
          if (wasDeleted) this.handleOrderDeletion();

          this.state.orderStatuses = orders;
          const active = orders[0];

          if (active?.currency) this.pricing.setCurrency(active.currency as 'EUR' | 'XAF');
          if (active) this.prefillFromActiveOrder(active);

          if (active && active.id !== this.snapshotOrderId) {
            this.snapshotOrderId = active.id;
            const orderItems = rawById[active.id]?.items;
            const arr: any[] = Array.isArray(orderItems)
              ? orderItems
              : (orderItems && typeof orderItems === 'object' ? Object.values(orderItems) : []);
            this.firebaseBasketSnapshot = arr.map(item => ({
              reference: item.reference,
              qty: Math.max(1, item.basketInfos?.selectedQuantity ?? 1),
              size: item.basketInfos?.selectedSize ?? 'M',
              model: item.basketInfos?.selectedModel ?? 'MODEL_UNIQUE',
            }));
          }
        })
      );

      if (newUser.uid && oldUser?.additionalInfos?.uid
        && newUser.uid !== oldUser.additionalInfos.uid
        && oldUser?.isAnonymous && oldUser?.credential) {
        this.authRepository.linkWithCredential(oldUser.credential)
          .then((c: any) => console.log('[linkWithCredential]', c))
          .catch((e: any) => console.error('[linkWithCredential]', e));
      }
    });
  }

  private handleOrderDeletion(): void {
    this.basketStorage.markBasketCleared();
    this.store.dispatch(new ActionClearBasket());
    this.deliveryStateService.clear();
    this.state = { ...INITIAL_CART_STATE, shippingAddress: { ...EMPTY_ADDRESS } };
  }

  private prefillFromActiveOrder(active: OrderStatusEntry): void {
    this.state.deliveryMode  = (active.deliveryMode  as 'pickup' | 'shipping') || null;
    this.state.pickupSubMode = (active.pickupSubMode as 'courier' | 'store')   || null;
    if (active.pickupSubMode === 'courier') this.state.courierAgreementChecked = true;
    if (active.deliveryMode === 'shipping' && active.shippingAddress) {
      this.state.shippingAddress = { ...active.shippingAddress };
    }
    this.saveDeliveryState();
  }

  private saveDeliveryState(): void {
    this.deliveryStateService.save({
      deliveryMode:    this.state.deliveryMode,
      pickupSubMode:   this.state.pickupSubMode,
      shippingAddress: this.state.shippingAddress,
    });
  }

  private selectDeliveryMode(mode: 'pickup' | 'shipping'): void {
    if (this.state.deliveryMode !== mode) {
      this.state.pickupSubMode = null;
      this.state.courierAgreementChecked = false;
    }
    this.state.deliveryMode = mode;
    this.saveDeliveryState();
    if (mode !== 'shipping') return;

    const a = this.state.shippingAddress;
    if (a.firstName || a.lastName || a.phone) return;
    const user = this.authRepository.getCurrentUser();
    if (!user) return;
    const displayName = user.displayName?.trim() ?? '';
    const spaceIdx = displayName.indexOf(' ');
    if (spaceIdx > 0) {
      a.firstName = displayName.slice(0, spaceIdx);
      a.lastName  = displayName.slice(spaceIdx + 1);
    } else {
      a.firstName = displayName;
    }
    if (user.phoneNumber) a.phone = user.phoneNumber;
  }

  private alertCommandNotSent(message: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'signin-dialog',
      disableClose: false,
      minWidth: 300,
      autoFocus: true,
      data: { disableClose: false, title: this.translateService.instant('COMMAND_NOT_SENT'), message },
    });
    this.subs.add(dialogRef.afterClosed().subscribe());
  }
}
