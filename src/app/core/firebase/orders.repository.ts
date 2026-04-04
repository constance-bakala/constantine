import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Database, ref, onValue, update, remove, runTransaction } from '@angular/fire/database';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Order, OrderItem, OrderStatus } from '@app/features/admin/admin-dashboard/admin-dashboard.types';

/**
 * OrdersRepository
 * Seule classe autorisée à lire/écrire le nœud Firebase `orders/`.
 */
@Injectable({ providedIn: 'root' })
export class OrdersRepository {

  constructor(
    private db: Database,
    private fns: Functions,
  ) {}

  /** Écoute en temps réel toutes les commandes, triées par date décroissante. */
  watchOrders(): Observable<Order[]> {
    return new Observable(observer => {
      const unsubscribe = onValue(
        ref(this.db, 'orders'),
        (snap) => {
          if (!snap.exists()) { observer.next([]); return; }
          const raw = snap.val() as Record<string, any>;
          const orders = Object.entries(raw)
            .map(([id, data]) => ({ id, ...data } as Order))
            .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
          observer.next(orders);
        },
        (err) => observer.error(err),
      );
      return () => unsubscribe();
    });
  }

  /** Annule une commande : supprime orders + orderStatus + commends, restaure le stock. */
  async cancelOrder(order: Order): Promise<void> {
    const removes: Promise<void>[] = [remove(ref(this.db, `orders/${order.id}`))];
    if (order.uid) {
      removes.push(remove(ref(this.db, `users/${order.uid}/orderStatus/${order.id}`)));
      removes.push(remove(ref(this.db, `users/${order.uid}/commends`)));
    }
    await Promise.all(removes);

    const items: OrderItem[] = Array.isArray(order.items)
      ? order.items
      : Object.values(order.items ?? {});

    await Promise.all(items.map(item => {
      if (!item.reference) return Promise.resolve();
      const qty = item.basketInfos?.selectedQuantity ?? 1;
      return runTransaction(ref(this.db, `stock/${item.reference}`), (current: any) => {
        if (current === null) return { available: qty };
        return { ...current, available: (current.available ?? 0) + qty };
      });
    }));
  }

  /** Supprime une commande sans restaurer le stock (usage admin). */
  async deleteOrder(order: Order): Promise<void> {
    const removes: Promise<void>[] = [remove(ref(this.db, `orders/${order.id}`))];
    if (order.uid) {
      removes.push(remove(ref(this.db, `users/${order.uid}/orderStatus/${order.id}`)));
    }
    await Promise.all(removes);
  }

  /** Passe la commande en "prête" via Cloud Function + écrit shippingCost directement. */
  async markReady(order: Order, shippingCost: number): Promise<void> {
    await httpsCallable(this.fns, 'updateOrderStatus')({ orderId: order.id, status: 'ready', shippingCost });
    // Écriture directe pour garantir la persistance indépendamment de la version de la CF.
    const writes: Record<string, any> = { [`orders/${order.id}/shippingCost`]: shippingCost };
    if (order.uid) {
      writes[`users/${order.uid}/orderStatus/${order.id}/shippingCost`] = shippingCost;
    }
    await update(ref(this.db, '/'), writes);
  }

  /** Passe la commande en "expédiée" avec URL de suivi. */
  async markShipped(order: Order, trackingUrl: string, carrierName: string): Promise<void> {
    await httpsCallable(this.fns, 'updateOrderStatus')({
      orderId: order.id, status: 'shipped', trackingUrl, carrierName,
    });
  }

  async setStatus(orderId: string, status: OrderStatus): Promise<void> {
    await httpsCallable(this.fns, 'updateOrderStatus')({ orderId, status });
  }

  async resendPaymentEmail(orderId: string): Promise<void> {
    await httpsCallable(this.fns, 'resendPaymentEmail')({ orderId });
  }
}
