import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { PricingService } from '@shared/services/pricing.service';
import { PromoCode } from '@shared/interfaces/promo-code.interfaces';

export interface ItemLine {
  ref: string;
  qty: number;
  total: string;
}

export interface OrderStatusDisplay {
  id: string;
  status: string;
  createdAt: number;
}

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  standalone: false,
})
export class OrderSummaryComponent {
  @Input() itemLines: ItemLine[] = [];
  @Input() nbSelectedItems$!: Observable<number>;
  @Input() cartTotal = '';
  @Input() cartTva = '';
  @Input() deliveryMode: 'pickup' | 'shipping' | null = null;
  @Input() pickupSubMode: 'courier' | 'store' | null = null;
  @Input() shippingCostEur: number | null = null;
  @Input() appliedPromo: PromoCode | null = null;
  @Input() promoDiscountFormatted = '';
  @Input() promoCodeInput = '';
  @Input() promoValidationStatus: 'idle' | 'loading' | 'valid' | 'not_found' | 'expired' = 'idle';
  @Input() orderStatuses: OrderStatusDisplay[] = [];
  @Input() statusLabels: Record<string, string> = {};
  @Input() statusColors: Record<string, string> = {};
  @Input() canSend = false;
  @Input() hasOutOfStockItems = false;
  @Input() commendAllreadySent = false;
  @Input() activeOrder: OrderStatusDisplay | null = null;
  @Input() courierAgreementChecked = false;
  @Input() isShippingAddressValid = false;

  @Output() sendCommand = new EventEmitter<void>();
  @Output() applyPromoCode = new EventEmitter<void>();
  @Output() clearPromoCode = new EventEmitter<void>();
  @Output() promoCodeInputChange = new EventEmitter<string>();

  constructor(public pricing: PricingService) {}
}
