import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PricingService } from '@shared/services/pricing.service';
import { OrdersRepository } from '@app/core/firebase/orders.repository';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {
  Order, OrderStatus,
  DELIVERY_MODE_LABELS, ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, EUR_TO_XAF,
} from './admin-dashboard.types';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: false,
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  loading = true;
  updatingOrderId: string | null = null;
  resendingEmailId: string | null = null;
  error: string | null = null;
  expandedItemKey: string | null = null;
  lightboxSrc: string | null = null;
  selectedOrder: Order | null = null;

  // Formulaire d'expédition inline
  shippingFormOrderId: string | null = null;
  trackingUrl = '';
  carrierName = '';
  trackingUrlError = false;

  // Formulaire "prête" (frais de port pour expédition internationale)
  readyFormOrderId: string | null = null;
  shippingCostInput: number | null = null;
  shippingCostError = false;

  activeTab: 'orders' | 'catalog' | 'settings' | 'promos' = 'orders';

  // ── Filtre + pagination commandes ─────────────────────────────────────────
  ordersFilter = '';
  readonly ordersPageSize = 10;
  ordersPage = 1;

  readonly statusLabels       = ORDER_STATUS_LABELS;
  readonly statusColors       = ORDER_STATUS_COLORS;
  readonly deliveryModeLabels = DELIVERY_MODE_LABELS;
  readonly EUR_TO_XAF         = EUR_TO_XAF;

  // ── Privé ─────────────────────────────────────────────────────────────────
  private ordersSubscription: Subscription | null = null;
  private ordersRetryTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    public pricing: PricingService,
    private ordersRepository: OrdersRepository,
    private dialog: MatDialog,
  ) {}

  // ── Getters ───────────────────────────────────────────────────────────────

  get filteredOrders(): Order[] {
    const q = this.ordersFilter.trim().toLowerCase();
    if (!q) return this.orders;
    return this.orders.filter(o =>
      o.id.toLowerCase().includes(q) ||
      (o.customerName  ?? '').toLowerCase().includes(q) ||
      (o.customerEmail ?? '').toLowerCase().includes(q)
    );
  }

  get ordersTotalPages(): number {
    return Math.max(1, Math.ceil(this.filteredOrders.length / this.ordersPageSize));
  }

  get pagedOrders(): Order[] {
    const start = (this.ordersPage - 1) * this.ordersPageSize;
    return this.filteredOrders.slice(start, start + this.ordersPageSize);
  }

  get ordersPages(): number[] {
    return Array.from({ length: this.ordersTotalPages }, (_, i) => i + 1);
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.subscribeToOrders();
  }

  ngOnDestroy(): void {
    this.ordersSubscription?.unsubscribe();
    if (this.ordersRetryTimeout) clearTimeout(this.ordersRetryTimeout);
  }

  // ── Formatage prix ────────────────────────────────────────────────────────

  formatXAF(xaf: number): string {
    return Math.round(xaf).toLocaleString('fr-FR') + ' FCFA';
  }

  formatEUR(eur: number): string {
    return `${eur >= 1 ? Math.round(eur) : eur.toFixed(2)} €`;
  }

  formatByOrderCurrency(amountEur: number, order: Order): string {
    return order.currency === 'EUR'
      ? this.formatEUR(amountEur)
      : this.formatXAF(Math.round(amountEur * EUR_TO_XAF / 100) * 100);
  }

  orderTotal(order: Order): string {
    return this.formatByOrderCurrency(this.orderRawHT(order), order);
  }

  orderTvaAmount(order: Order): string | null {
    if (order.deliveryMode !== 'shipping') return null;
    return this.formatByOrderCurrency(this.orderRawHT(order) * 0.1, order);
  }

  orderTotalTTC(order: Order): string {
    const htEur = this.orderRawHT(order);
    const tvaEur = order.deliveryMode === 'shipping' ? htEur * 0.1 : 0;
    const shippingXAF = order.shippingCost ?? 0;
    if (order.currency === 'EUR') {
      return this.formatEUR(htEur + tvaEur + shippingXAF / EUR_TO_XAF);
    }
    const toXAF = (eur: number) => Math.round(eur * EUR_TO_XAF / 100) * 100;
    return this.formatXAF(toXAF(htEur) + toXAF(tvaEur) + shippingXAF);
  }

  // ── Pagination / filtre ───────────────────────────────────────────────────

  goToOrdersPage(page: number): void {
    if (page < 1 || page > this.ordersTotalPages) return;
    this.ordersPage = page;
  }

  onOrdersFilterChange(): void {
    this.ordersPage = 1;
  }

  // ── UI ────────────────────────────────────────────────────────────────────

  toggleItem(orderId: string, index: number): void {
    const key = `${orderId}-${index}`;
    this.expandedItemKey = this.expandedItemKey === key ? null : key;
  }

  isExpanded(orderId: string, index: number): boolean {
    return this.expandedItemKey === `${orderId}-${index}`;
  }

  openLightbox(src: string): void { this.lightboxSrc = src; }
  closeLightbox(): void { this.lightboxSrc = null; }

  openShippingForm(orderId: string): void {
    this.shippingFormOrderId = orderId;
    this.trackingUrl = '';
    this.carrierName = '';
    this.trackingUrlError = false;
    this.error = null;
  }

  cancelShippingForm(): void { this.shippingFormOrderId = null; }

  openReadyForm(orderId: string): void {
    this.readyFormOrderId = orderId;
    this.shippingCostInput = null;
    this.shippingCostError = false;
    this.error = null;
  }

  cancelReadyForm(): void { this.readyFormOrderId = null; }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.shippingFormOrderId = null;
    this.expandedItemKey = null;
  }

  backToOrders(): void {
    this.selectedOrder = null;
    this.shippingFormOrderId = null;
  }

  itemCount(order: Order): number {
    return (order.items ?? []).reduce((s, i) => s + (i.basketInfos?.selectedQuantity ?? 1), 0);
  }

  minVal(a: number, b: number): number { return Math.min(a, b); }

  trackById(_: number, order: Order): string { return order.id; }

  // ── Actions commandes ─────────────────────────────────────────────────────

  openCancelConfirm(order: Order): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Annuler la commande',
        message: '⚠️ Confirmer l\'annulation ? Le stock sera restauré et le client ne verra plus cette commande.',
        confirmLabel: 'Annuler la commande',
        cancelLabel: 'Retour',
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) this.doCancel(order);
    });
  }

  private async doCancel(order: Order): Promise<void> {
    await this.runOrderAction(order.id, () => this.ordersRepository.cancelOrder(order));
    if (!this.error) this.selectedOrder = null;
  }

  async deleteOrder(order: Order): Promise<void> {
    await this.runOrderAction(order.id, () => this.ordersRepository.deleteOrder(order));
    if (!this.error) this.selectedOrder = null;
  }

  async confirmReady(order: Order): Promise<void> {
    const cost = this.shippingCostInput;
    if (cost === null || cost < 0) { this.shippingCostError = true; return; }
    await this.runOrderAction(order.id, () => this.ordersRepository.markReady(order, cost));
    if (!this.error) this.readyFormOrderId = null;
  }

  async confirmShipped(order: Order): Promise<void> {
    if (!this.trackingUrl.trim()) { this.trackingUrlError = true; return; }
    await this.runOrderAction(order.id, () =>
      this.ordersRepository.markShipped(order, this.trackingUrl.trim(), this.carrierName.trim())
    );
    if (!this.error) this.shippingFormOrderId = null;
  }

  async setStatus(order: Order, status: OrderStatus): Promise<void> {
    await this.runOrderAction(order.id, () => this.ordersRepository.setStatus(order.id, status));
  }

  async resendPaymentEmail(order: Order): Promise<void> {
    if (this.resendingEmailId) return;
    this.resendingEmailId = order.id;
    this.error = null;
    try {
      await this.ordersRepository.resendPaymentEmail(order.id);
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors du renvoi de l\'email.';
      console.error(err);
    } finally {
      this.resendingEmailId = null;
    }
  }

  // ── Privé ─────────────────────────────────────────────────────────────────

  private subscribeToOrders(): void {
    this.ordersSubscription?.unsubscribe();
    this.ordersSubscription = this.ordersRepository.watchOrders().subscribe({
      next: (orders) => {
        this.loading = false;
        this.error = null;
        this.orders = orders;
        if (this.selectedOrder) {
          this.selectedOrder = orders.find(o => o.id === this.selectedOrder!.id) ?? null;
        }
      },
      error: (err) => {
        this.loading = false;
        console.warn('[AdminDashboard] orders listener revoked, retrying in 3s…', err);
        this.ordersRetryTimeout = setTimeout(() => this.subscribeToOrders(), 3000);
      },
    });
  }

  private orderRawHT(order: Order): number {
    return (order.items ?? []).reduce((sum, item) => {
      return sum + (item.price ?? 0) * (item.basketInfos?.selectedQuantity ?? 1);
    }, 0);
  }

  /** Wrapper générique : gère updatingOrderId, error, finally. */
  private async runOrderAction(orderId: string, action: () => Promise<void>): Promise<void> {
    if (this.updatingOrderId) return;
    this.updatingOrderId = orderId;
    this.error = null;
    try {
      await action();
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors de la mise à jour.';
      console.error(err);
    } finally {
      this.updatingOrderId = null;
    }
  }
}
