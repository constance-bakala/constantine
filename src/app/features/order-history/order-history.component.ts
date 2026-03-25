import { Component, OnDestroy, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { PricingService } from '@shared/services/pricing.service';

export interface HistoryItem {
  title: string;
  reference?: string;
  price?: number;
  basketInfos?: { selectedQuantity: number };
}

export interface HistoryOrder {
  id: string;
  createdAt: number;
  items: HistoryItem[];
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  standalone: false,
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: HistoryOrder[] = [];
  loading = true;

  private orderStatusRef?: firebase.database.Reference;

  constructor(public pricing: PricingService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) { this.loading = false; return; }
      this.orderStatusRef = firebase.database().ref(`users/${user.uid}/orderStatus`);
      this.orderStatusRef.on('value', (snap: any) => {
        this.loading = false;
        if (!snap.exists()) { this.orders = []; return; }
        const raw = snap.val() as Record<string, any>;
        this.orders = Object.entries(raw)
          .filter(([, data]) => data?.status === 'shipped')
          .map(([id, data]) => ({
            id,
            createdAt: data.createdAt ?? 0,
            items: Array.isArray(data.items) ? data.items : [],
          }))
          .sort((a, b) => b.createdAt - a.createdAt);
      });
    });
  }

  ngOnDestroy(): void {
    this.orderStatusRef?.off();
  }

  orderTotal(order: HistoryOrder): string {
    const total = order.items.reduce((sum, item) => {
      const qty = item.basketInfos?.selectedQuantity ?? 1;
      return sum + (item.price ?? 0) * qty;
    }, 0);
    return this.pricing.format(total);
  }
}
