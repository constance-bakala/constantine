// ── Types ─────────────────────────────────────────────────────────────────────

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
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };
  trackingUrl?: string;
  carrierName?: string;
  shippingCost?: number;
  currency?: string;
}

// ── Constantes ────────────────────────────────────────────────────────────────

export const EUR_TO_XAF = 655.96;

export const DELIVERY_MODE_LABELS: Record<string, string> = {
  pickup:         '🏪 Retrait au Gabon',
  pickup_courier: '🛵 Payé à réception au livreur',
  pickup_store:   '🏪 Récupération au magasin',
  shipping:       '✈️ Expédition internationale',
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending:   'En attente',
  ready:     'Prête',
  paid:      'Payée',
  shipped:   'Expédiée',
  cancelled: 'Annulée',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending:   '#e67e22',
  ready:     '#148f77',
  paid:      '#2c3e50',
  shipped:   '#6c3483',
  cancelled: '#95a5a6',
};
