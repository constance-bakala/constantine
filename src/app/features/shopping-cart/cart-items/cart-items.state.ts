import { ItemInfos } from '@shared/interfaces';
import { PromoCode } from '@shared/interfaces/promo-code.interfaces';
import { OrderStatusEntry } from '../services/order.service';
import { ShippingAddress } from '../delivery-step/delivery-step.component';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CartState {
  items: ItemInfos[];
  deliveryMode: 'pickup' | 'shipping' | null;
  pickupSubMode: 'courier' | 'store' | null;
  courierAgreementChecked: boolean;
  shippingAddress: ShippingAddress;
  commendAllreadySent: boolean;
  orderStatuses: OrderStatusEntry[];
  stockByRef: Record<string, number>;
  lightboxSrc: string | null;
  checkoutStep: number;
  promoCodeInput: string;
  appliedPromo: PromoCode | null;
  promoValidationStatus: 'idle' | 'loading' | 'valid' | 'not_found' | 'expired';
}

// ── Valeurs initiales ─────────────────────────────────────────────────────────

export const EMPTY_ADDRESS: ShippingAddress = {
  firstName: '', lastName: '', address1: '', address2: '',
  postalCode: '', city: '', country: '', phone: '',
};

export const INITIAL_CART_STATE: CartState = {
  items: [],
  deliveryMode: null,
  pickupSubMode: null,
  courierAgreementChecked: false,
  shippingAddress: { ...EMPTY_ADDRESS },
  commendAllreadySent: false,
  orderStatuses: [],
  stockByRef: {},
  lightboxSrc: null,
  checkoutStep: 1,
  promoCodeInput: '',
  appliedPromo: null,
  promoValidationStatus: 'idle',
};

// ── Constantes UI ─────────────────────────────────────────────────────────────

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  ready:   'Prête — consultez votre email',
  paid:    'Payée',
  shipped: 'Expédiée',
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: '#e67e22',
  ready:   '#148f77',
  paid:    '#2c3e50',
  shipped: '#6c3483',
};
