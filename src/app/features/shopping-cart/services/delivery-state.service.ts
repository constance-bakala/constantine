import { Injectable } from '@angular/core';
import { ShippingAddress } from '../delivery-step/delivery-step.component';

export interface DeliveryState {
  deliveryMode: 'pickup' | 'shipping' | null;
  pickupSubMode: 'courier' | 'store' | null;
  shippingAddress: ShippingAddress;
}

const STORAGE_KEY = 'deliveryState';

@Injectable({ providedIn: 'root' })
export class DeliveryStateService {

  save(state: DeliveryState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  restore(): DeliveryState | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) as DeliveryState : null;
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
