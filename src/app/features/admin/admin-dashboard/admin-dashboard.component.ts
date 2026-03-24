import { Component, OnInit, OnDestroy } from '@angular/core';
import { Database, ref, onValue, update, remove, runTransaction } from '@angular/fire/database';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { MatDialog } from '@angular/material/dialog';
import { PricingService } from '@shared/services/pricing.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

export type OrderStatus = 'pending' | 'ready' | 'paid' | 'shipped' | 'cancelled';

export interface OrderItem {
  title?: string;
  reference?: string;
  price?: number;
  path?: string;
  coverUrl?: string;
  basketInfos?: {
    selectedQuantity: number;
    selectedSize?: string;
    selectedModel?: string;
  };
}

export interface Order {
  id: string;
  uid?: string;
  status: OrderStatus;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  createdAt: number;
  updatedAt?: number;
  deliveryMode?: 'pickup' | 'shipping';
  pickupSubMode?: 'courier' | 'store';
  shippingAddress?: { firstName: string; lastName: string; address1: string; address2?: string; postalCode: string; city: string; country: string; phone: string };
  trackingUrl?: string;
  carrierName?: string;
  shippingCost?: number;
  currency?: string;
}

export const DELIVERY_MODE_LABELS: Record<string, string> = {
  pickup:          '🏪 Retrait au Gabon',
  pickup_courier:  '🛵 Payé à réception au livreur',
  pickup_store:    '🏪 Récupération au magasin',
  shipping:        '✈️ Expédition internationale',
};

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


  activeTab: 'orders' | 'catalog' | 'settings' = 'orders';

  // ── Filtre + pagination commandes
  ordersFilter = '';
  readonly ordersPageSize = 10;
  ordersPage = 1;

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

  goToOrdersPage(page: number): void {
    if (page < 1 || page > this.ordersTotalPages) return;
    this.ordersPage = page;
  }

  onOrdersFilterChange(): void {
    this.ordersPage = 1;
  }

  private ordersUnsubscribe: (() => void) | null = null;
  private ordersRetryTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly statusLabels: Record<OrderStatus, string> = {
    pending:   'En attente',
    ready:     'Prête',
    paid:      'Payée',
    shipped:   'Expédiée',
    cancelled: 'Annulée',
  };

  readonly statusColors: Record<OrderStatus, string> = {
    pending:   '#e67e22',
    ready:     '#148f77',
    paid:      '#2c3e50',
    shipped:   '#6c3483',
    cancelled: '#95a5a6',
  };

  readonly deliveryModeLabels = DELIVERY_MODE_LABELS;

  constructor(
    public pricing: PricingService,
    private db: Database,
    private fns: Functions,
    private dialog: MatDialog,
  ) {}

  readonly EUR_TO_XAF = 655.96;

  private orderRawHT(order: Order): number {
    return (order.items ?? []).reduce((sum, item) => {
      const qty = item.basketInfos?.selectedQuantity ?? 1;
      return sum + (item.price ?? 0) * qty;
    }, 0);
  }

  private toXAF(eur: number): number {
    return Math.round(eur * this.EUR_TO_XAF / 100) * 100;
  }

  formatXAF(xaf: number): string {
    return Math.round(xaf).toLocaleString('fr-FR') + ' FCFA';
  }

  formatEUR(eur: number): string {
    return `${eur >= 1 ? Math.round(eur) : eur.toFixed(2)} €`;
  }

  formatByOrderCurrency(amountEur: number, order: Order): string {
    return order.currency === 'EUR'
      ? this.formatEUR(amountEur)
      : this.formatXAF(this.toXAF(amountEur));
  }

  orderTotal(order: Order): string {
    return this.formatByOrderCurrency(this.orderRawHT(order), order);
  }

  /** TVA 10% uniquement pour expédition internationale. */
  orderTvaAmount(order: Order): string | null {
    if (order.deliveryMode !== 'shipping') return null;
    return this.formatByOrderCurrency(this.orderRawHT(order) * 0.1, order);
  }

  orderTotalTTC(order: Order): string {
    const htEur = this.orderRawHT(order);
    const tvaEur = order.deliveryMode === 'shipping' ? htEur * 0.1 : 0;
    const shippingXAF = order.shippingCost ?? 0;
    if (order.currency === 'EUR') {
      const shippingEur = shippingXAF / this.EUR_TO_XAF;
      return this.formatEUR(htEur + tvaEur + shippingEur);
    }
    return this.formatXAF(this.toXAF(htEur) + this.toXAF(tvaEur) + shippingXAF);
  }

  toggleItem(orderId: string, index: number): void {
    const key = `${orderId}-${index}`;
    this.expandedItemKey = this.expandedItemKey === key ? null : key;
  }

  openLightbox(src: string): void { this.lightboxSrc = src; }
  closeLightbox(): void { this.lightboxSrc = null; }

  isExpanded(orderId: string, index: number): boolean {
    return this.expandedItemKey === `${orderId}-${index}`;
  }

  ngOnInit(): void {
    this.subscribeToOrders();
  }

  private subscribeToOrders(): void {
    this.ordersUnsubscribe?.();
    this.ordersUnsubscribe = onValue(
      ref(this.db, 'orders'),
      (snap) => {
        this.loading = false;
        this.error = null;
        if (!snap.exists()) { this.orders = []; return; }
        const raw = snap.val() as Record<string, any>;
        this.orders = Object.entries(raw)
          .map(([id, data]) => ({ id, ...data } as Order))
          .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
        if (this.selectedOrder) {
          this.selectedOrder = this.orders.find(o => o.id === this.selectedOrder!.id) ?? null;
        }
      },
      (err) => {
        this.loading = false;
        console.warn('[AdminDashboard] orders listener revoked, retrying in 3s…', err);
        // Réabonnement automatique après un court délai (token refresh transitoire)
        this.ordersRetryTimeout = setTimeout(() => this.subscribeToOrders(), 3000);
      }
    );
  }

  ngOnDestroy(): void {
    this.ordersUnsubscribe?.();
    if (this.ordersRetryTimeout) clearTimeout(this.ordersRetryTimeout);
  }

  openShippingForm(orderId: string): void {
    this.shippingFormOrderId = orderId;
    this.trackingUrl = '';
    this.carrierName = '';
    this.trackingUrlError = false;
    this.error = null;
  }

  cancelShippingForm(): void {
    this.shippingFormOrderId = null;
  }

  openReadyForm(orderId: string): void {
    this.readyFormOrderId = orderId;
    this.shippingCostInput = null;
    this.shippingCostError = false;
    this.error = null;
  }

  cancelReadyForm(): void {
    this.readyFormOrderId = null;
  }

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
    if (this.updatingOrderId) return;
    this.updatingOrderId = order.id;
    this.error = null;
    try {
      // Suppression complète : orders + orderStatus + commends
      const removes: Promise<void>[] = [
        remove(ref(this.db, `orders/${order.id}`)),
      ];
      if (order.uid) {
        removes.push(remove(ref(this.db, `users/${order.uid}/orderStatus/${order.id}`)));
        removes.push(remove(ref(this.db, `users/${order.uid}/commends`)));
      }
      await Promise.all(removes);

      // Restauration du stock
      const items: OrderItem[] = Array.isArray(order.items) ? order.items : Object.values(order.items ?? {});
      await Promise.all(items.map(item => {
        if (!item.reference) return Promise.resolve();
        const qty = item.basketInfos?.selectedQuantity ?? 1;
        return runTransaction(ref(this.db, `stock/${item.reference}`), (current: any) => {
          if (current === null) return { available: qty };
          return { ...current, available: (current.available ?? 0) + qty };
        });
      }));

      this.selectedOrder = null;
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors de l\'annulation.';
      console.error(err);
    } finally {
      this.updatingOrderId = null;
    }
  }

  async deleteOrder(order: Order): Promise<void> {
    if (this.updatingOrderId) return;
    this.updatingOrderId = order.id;
    this.error = null;
    try {
      const removes: Promise<void>[] = [
        remove(ref(this.db, `orders/${order.id}`)),
      ];
      if (order.uid) {
        removes.push(remove(ref(this.db, `users/${order.uid}/orderStatus/${order.id}`)));
      }
      await Promise.all(removes);
      this.selectedOrder = null;
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors de la suppression.';
      console.error(err);
    } finally {
      this.updatingOrderId = null;
    }
  }

  async confirmReady(order: Order): Promise<void> {
    const cost = this.shippingCostInput;
    if (cost === null || cost < 0) {
      this.shippingCostError = true;
      return;
    }
    if (this.updatingOrderId) return;
    this.updatingOrderId = order.id;
    this.shippingCostError = false;
    this.error = null;
    try {
      await httpsCallable(this.fns, 'updateOrderStatus')({ orderId: order.id, status: 'ready', shippingCost: cost! });

      // Écriture directe pour garantir la persistance de shippingCost
      // indépendamment de la version déployée de la cloud function.
      const writes: Record<string, any> = {
        [`orders/${order.id}/shippingCost`]: cost!,
      };
      if (order.uid) {
        writes[`users/${order.uid}/orderStatus/${order.id}/shippingCost`] = cost!;
      }
      await update(ref(this.db, '/'), writes);

      this.readyFormOrderId = null;
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors de la mise à jour.';
      console.error(err);
    } finally {
      this.updatingOrderId = null;
    }
  }

  async confirmShipped(order: Order): Promise<void> {
    if (!this.trackingUrl.trim()) {
      this.trackingUrlError = true;
      return;
    }
    if (this.updatingOrderId) return;
    this.updatingOrderId = order.id;
    this.trackingUrlError = false;
    this.error = null;

    try {
      await httpsCallable(this.fns, 'updateOrderStatus')({ orderId: order.id, status: 'shipped', trackingUrl: this.trackingUrl.trim(), carrierName: this.carrierName.trim() });
      this.shippingFormOrderId = null;
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors de l\'expédition.';
      console.error(err);
    } finally {
      this.updatingOrderId = null;
    }
  }

  async setStatus(order: Order, status: OrderStatus): Promise<void> {
    if (this.updatingOrderId) return;
    this.updatingOrderId = order.id;
    this.error = null;

    try {
      await httpsCallable(this.fns, 'updateOrderStatus')({ orderId: order.id, status });
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors de la mise à jour.';
      console.error(err);
    } finally {
      this.updatingOrderId = null;
    }
  }

  async resendPaymentEmail(order: Order): Promise<void> {
    if (this.resendingEmailId) return;
    this.resendingEmailId = order.id;
    this.error = null;
    try {
      await httpsCallable(this.fns, 'resendPaymentEmail')({ orderId: order.id });
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors du renvoi de l\'email.';
      console.error(err);
    } finally {
      this.resendingEmailId = null;
    }
  }

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

  trackById(_: number, order: Order): string {
    return order.id;
  }
}
