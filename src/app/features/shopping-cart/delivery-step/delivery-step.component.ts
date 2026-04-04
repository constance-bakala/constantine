import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
}

@Component({
  selector: 'app-delivery-step',
  templateUrl: './delivery-step.component.html',
  styleUrls: ['./delivery-step.component.scss'],
  standalone: false,
})
export class DeliveryStepComponent {
  @Input() checkoutStep = 1;
  @Input() deliveryMode: 'pickup' | 'shipping' | null = null;
  @Input() pickupSubMode: 'courier' | 'store' | null = null;
  @Input() courierAgreementChecked = false;
  @Input() shippingAddress!: ShippingAddress;
  @Input() canGoToPayment = false;

  @Output() headerClick = new EventEmitter<void>();
  @Output() deliveryModeToggle = new EventEmitter<'pickup' | 'shipping'>();
  @Output() pickupSubModeToggle = new EventEmitter<'courier' | 'store'>();
  @Output() courierAgreementChange = new EventEmitter<boolean>();
  @Output() shippingAddressChange = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  get deliveryModeSummary(): string {
    if (!this.deliveryMode) return '';
    if (this.deliveryMode === 'pickup') {
      if (this.pickupSubMode === 'courier') return '🛵 Livraison à domicile';
      if (this.pickupSubMode === 'store') return '🏪 Retrait en magasin';
      return '🏠 Retrait';
    }
    return '✈️ Expédition internationale';
  }

  get isShippingAddressValid(): boolean {
    const a = this.shippingAddress;
    if (!a) return false;
    return !!(a.firstName?.trim() && a.lastName?.trim() && a.address1?.trim()
      && a.postalCode?.trim() && a.city?.trim() && a.country?.trim() && a.phone?.trim());
  }
}
