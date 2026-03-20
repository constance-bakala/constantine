import { Component, OnInit, OnDestroy } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/functions';

export type OrderStatus = 'pending' | 'ready' | 'paid';

export interface OrderItem {
  title: string;
  path?: string;
  basketInfos?: {
    selectedQuantity: number;
    selectedSize?: string;
    selectedModel?: string;
  };
}

export interface Order {
  id: string;
  status: OrderStatus;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  createdAt: number;
  updatedAt?: number;
}

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
  error: string | null = null;

  private ordersRef: firebase.database.Reference | null = null;

  readonly statusLabels: Record<OrderStatus, string> = {
    pending: 'En attente',
    ready:   'Prête',
    paid:    'Payée',
  };

  readonly statusColors: Record<OrderStatus, string> = {
    pending: '#e67e22',
    ready:   '#148f77',
    paid:    '#2c3e50',
  };

  ngOnInit(): void {
    this.ordersRef = firebase.database().ref('orders');
    this.ordersRef.on('value', (snap) => {
      this.loading = false;
      if (!snap.exists()) {
        this.orders = [];
        return;
      }
      const raw = snap.val() as Record<string, any>;
      this.orders = Object.entries(raw)
        .map(([id, data]) => ({ id, ...data } as Order))
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    }, (err: Error) => {
      this.loading = false;
      this.error = 'Erreur de connexion à la base de données.';
      console.error(err);
    });
  }

  ngOnDestroy(): void {
    this.ordersRef?.off();
  }

  async setStatus(order: Order, status: OrderStatus): Promise<void> {
    if (this.updatingOrderId) return;
    this.updatingOrderId = order.id;
    this.error = null;

    try {
      const fn = firebase.functions().httpsCallable('updateOrderStatus');
      await fn({ orderId: order.id, status });
    } catch (err: any) {
      this.error = err?.message ?? 'Erreur lors de la mise à jour.';
      console.error(err);
    } finally {
      this.updatingOrderId = null;
    }
  }

  trackById(_: number, order: Order): string {
    return order.id;
  }
}
