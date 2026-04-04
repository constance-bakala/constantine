import { Inject, Injectable } from '@angular/core';
import _ from 'lodash';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Observable, from } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { TranslateService } from '@ngx-translate/core';
import { PricingService } from '@shared/services/pricing.service';
import { PromoCode } from '@shared/interfaces/promo-code.interfaces';
import { compareObjects } from '@helpers/compare.objects.utils';
import { ShippingAddress } from '../delivery-step/delivery-step.component';
import { environment } from '@env/environment';
import { APP_CONFIG } from '@helpers/constants';
import { IAppConfig } from '@shared/interfaces/app.interfaces';

// ── Types publics ─────────────────────────────────────────────────────────────

export interface OrderStatusEntry {
  id: string;
  status: string;
  createdAt: number;
  deliveryMode?: string;
  pickupSubMode?: string;
  shippingAddress?: any;
  shippingCost?: number;
  currency?: string;
}

export interface OrderStatusSnapshot {
  orders: OrderStatusEntry[];
  /** Données Firebase brutes indexées par orderId (pour reconstruire le snapshot panier). */
  rawById: Record<string, any>;
}

export interface BasketSnapshot {
  reference: string;
  qty: number;
  size: string;
  model: string;
}

export interface OrderSendParams {
  user: firebase.User;
  /** Items préparés avec price (EUR effectif) et basketInfos. */
  itemsToSend: any[];
  existingOrderId: string | null;
  deliveryMode: 'pickup' | 'shipping';
  pickupSubMode: 'courier' | 'store' | null;
  shippingAddress: ShippingAddress;
  currency: string;
  stockByRef: Record<string, number>;
  promoDiscountRaw: number;
  appliedPromo: PromoCode | null;
}

export type OrderSendResult =
  | { type: 'duplicate' }
  | { type: 'anonymous' }
  | { type: 'success'; isUpdate: boolean; newSnapshot: BasketSnapshot[] };

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(
    private fun: Functions,
    private pricing: PricingService,
    private translateService: TranslateService,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
  ) {}

  /**
   * Écoute en temps réel le nœud `users/${uid}/orderStatus` et émet à chaque changement.
   * Le caller est responsable de désabonner l'Observable (via Subscription.unsubscribe).
   */
  watchOrderStatus(uid: string): Observable<OrderStatusSnapshot> {
    return new Observable(observer => {
      const dbRef = firebase.database().ref(`users/${uid}/orderStatus`);

      const handler = (snap: firebase.database.DataSnapshot) => {
        const rawById = snap.exists() ? (snap.val() as Record<string, any>) : {};
        const orders = Object.entries(rawById)
          .map(([id, data]) => ({
            id,
            status: data.status ?? 'pending',
            createdAt: data.createdAt ?? 0,
            deliveryMode: data.deliveryMode,
            pickupSubMode: data.pickupSubMode,
            shippingAddress: data.shippingAddress,
            shippingCost: typeof data.shippingCost === 'number' ? data.shippingCost : undefined,
            currency: data.currency,
          }))
          .filter(o => o.status !== 'shipped' && o.status !== 'cancelled')
          .sort((a, b) => b.createdAt - a.createdAt);

        observer.next({ orders, rawById });
      };

      dbRef.on('value', handler);
      return () => dbRef.off('value', handler);
    });
  }

  /**
   * Envoie ou met à jour une commande dans Firebase.
   * Gère : écriture commends, orders, orderStatus, stock (delta), email de notification.
   */
  sendOrder(params: OrderSendParams): Observable<OrderSendResult> {
    return new Observable(observer => {
      const { user, itemsToSend, existingOrderId } = params;
      const commendsRef = firebase.database().ref(`users/${user.uid}/commends`);

      commendsRef.once('value').then(snap => {

        // Vérification doublon (nouvelle commande uniquement)
        if (!existingOrderId) {
          const existing = this.getExistingItemsFromSnap(snap);
          if (existing && compareObjects(existing, itemsToSend)) {
            observer.next({ type: 'duplicate' });
            observer.complete();
            return;
          }
        }

        // Les anonymes ne peuvent pas passer commande
        if (user.isAnonymous) {
          observer.next({ type: 'anonymous' });
          observer.complete();
          return;
        }

        const orderKey = existingOrderId ?? firebase.database().ref().push().key!;
        const payload: Record<string, any> = {};
        payload[orderKey] = itemsToSend;

        commendsRef.set(payload).then(() => {
          const isUpdate = !!existingOrderId;
          this.writeOrderToFirebase(params, orderKey, isUpdate, snap);

          if (!isUpdate) {
            this.sendNotificationEmail(params, orderKey, false);
          }

          const newSnapshot: BasketSnapshot[] = itemsToSend.map(item => ({
            reference: item.reference,
            qty: item.basketInfos?.selectedQuantity ?? 1,
            size: item.basketInfos?.selectedSize ?? 'M',
            model: item.basketInfos?.selectedModel ?? 'MODEL_UNIQUE',
          }));

          observer.next({ type: 'success', isUpdate, newSnapshot });
          observer.complete();
        }).catch(e => observer.error(e));

      }).catch(e => observer.error(e));
    });
  }

  // ── Privé ──────────────────────────────────────────────────────────────────

  private getExistingItemsFromSnap(snap: firebase.database.DataSnapshot): any[] | undefined {
    const val = snap.val();
    if (!val) return undefined;
    let items: any = Object.values(val)[0];
    if (items && !Array.isArray(items)) items = [items];
    return items;
  }

  private writeOrderToFirebase(
    params: OrderSendParams,
    orderKey: string,
    isUpdate: boolean,
    snap: firebase.database.DataSnapshot,
  ): void {
    const { user, itemsToSend, existingOrderId, deliveryMode, pickupSubMode, shippingAddress, currency, stockByRef } = params;
    const shippingAddr = deliveryMode === 'shipping' ? { ...shippingAddress } : null;
    const pickupSubModeValue = deliveryMode === 'pickup' ? (pickupSubMode ?? null) : null;

    if (isUpdate) {
      firebase.database().ref(`orders/${existingOrderId}`).update({
        items: itemsToSend,
        deliveryMode,
        pickupSubMode: pickupSubModeValue,
        updatedAt: Date.now(),
        shippingAddress: shippingAddr ?? null,
        currency,
      }).catch((e: any) => console.error('[orders] update error', e));

      firebase.database().ref(`users/${user.uid}/orderStatus/${existingOrderId}`).update({
        items: itemsToSend,
        deliveryMode,
        pickupSubMode: pickupSubModeValue,
        shippingAddress: shippingAddr ?? null,
        currency,
      }).catch((e: any) => console.error('[orderStatus] update error', e));

    } else {
      const createdAt = Date.now();
      firebase.database().ref(`orders/${orderKey}`).set({
        status: 'pending',
        uid: user.uid,
        createdAt,
        customerEmail: user.email ?? '',
        customerName: user.displayName ?? user.email ?? '',
        items: itemsToSend,
        deliveryMode,
        currency,
        ...(pickupSubModeValue ? { pickupSubMode: pickupSubModeValue } : {}),
        ...(shippingAddr ? { shippingAddress: shippingAddr } : {}),
      }).catch((e: any) => console.error('[orders] write error', e));

      firebase.database().ref(`users/${user.uid}/orderStatus/${orderKey}`).set({
        status: 'pending',
        createdAt,
        items: itemsToSend,
        deliveryMode,
        currency,
        ...(pickupSubModeValue ? { pickupSubMode: pickupSubModeValue } : {}),
        ...(shippingAddr ? { shippingAddress: shippingAddr } : {}),
      }).catch((e: any) => console.error('[orderStatus] write error', e));
    }

    this.updateStock(params, orderKey, isUpdate, snap);
  }

  private updateStock(
    params: OrderSendParams,
    orderKey: string,
    isUpdate: boolean,
    snap: firebase.database.DataSnapshot,
  ): void {
    const { itemsToSend, existingOrderId, stockByRef } = params;

    // Reconstruction de l'ancienne quantité par référence (pour calculer le delta)
    const oldItemsMap: Record<string, number> = {};
    if (isUpdate && existingOrderId) {
      const snapVal = snap.val() as Record<string, any> | null;
      const rawOldItems = snapVal?.[existingOrderId];
      const oldItems: any[] = Array.isArray(rawOldItems)
        ? rawOldItems
        : (rawOldItems && typeof rawOldItems === 'object' ? Object.values(rawOldItems) : []);
      oldItems.forEach((old: any) => {
        if (old?.reference) {
          oldItemsMap[old.reference] = old.basketInfos?.selectedQuantity ?? 1;
        }
      });
    }

    // Delta stock pour les articles présents dans la nouvelle commande
    itemsToSend.forEach(item => {
      const newQty = item.basketInfos?.selectedQuantity ?? 1;
      const oldQty = oldItemsMap[item.reference] ?? 0;
      const delta = newQty - oldQty;
      if (delta === 0) return;
      const known = stockByRef[item.reference] ?? 0;
      firebase.database().ref(`stock/${item.reference}`).transaction(current => {
        if (current === null) return { available: Math.max(0, known - delta) };
        return { ...current, available: Math.max(0, (current.available ?? known) - delta) };
      }).catch((e: any) => console.error('[stock delta]', e));
    });

    // Libérer le stock des articles retirés de la commande
    Object.entries(oldItemsMap).forEach(([reference, oldQty]) => {
      if (itemsToSend.some(item => item.reference === reference)) return;
      const known = stockByRef[reference] ?? 0;
      firebase.database().ref(`stock/${reference}`).transaction(current => {
        if (current === null) return { available: known + oldQty };
        return { ...current, available: (current.available ?? known) + oldQty };
      }).catch((e: any) => console.error('[stock release]', e));
    });
  }

  private sendNotificationEmail(params: OrderSendParams, orderId: string, isUpdate: boolean): void {
    const { user, itemsToSend, deliveryMode, pickupSubMode, shippingAddress, appliedPromo, promoDiscountRaw } = params;

    const protocol = window.location.protocol;
    let prefix = `${protocol}//${window.location.host}`;
    if (prefix.includes('github')) prefix += '/' + environment.appId;

    const currency = this.pricing.currency;
    const currencySymbol = currency === 'XAF' ? 'FCFA' : '€';
    const tvaRate = this.pricing.tvaRate;
    const hasTva = tvaRate > 0;

    const emailData = itemsToSend.map(item => {
      const cloned = _.cloneDeep(item);
      if (cloned.path.startsWith('http')) {
        cloned.path = cloned.path.replace('cover.webp', 'cover.jpeg');
      } else {
        cloned.path = `${prefix}/${cloned.path.replace(/cover\.webp$/, 'cover.jpeg')}`;
      }
      const qty = cloned.basketInfos?.selectedQuantity ?? 1;
      cloned.unitPriceFormatted = this.pricing.format(cloned.price ?? 0);
      cloned.linePriceFormatted = this.pricing.format((cloned.price ?? 0) * qty);
      delete cloned.loading;
      delete cloned.selected;
      delete cloned.index;
      return cloned;
    });

    const rawTotalHT = emailData.reduce((sum: number, item: any) =>
      sum + this.pricing.formatRaw(item.price ?? 0) * (item.basketInfos?.selectedQuantity ?? 1), 0);
    const rawTva = hasTva ? Math.round(rawTotalHT * tvaRate) : 0;

    const deliveryModeLabel = deliveryMode === 'pickup'
      ? (pickupSubMode === 'courier'
          ? 'Payé à réception au livreur (2 000–5 000 FCFA)'
          : pickupSubMode === 'store'
            ? 'Récupération au magasin — Libreville'
            : 'Retrait au Gabon')
      : 'Expédition internationale';

    const sa = shippingAddress;
    const shippingAddressFormatted = deliveryMode === 'shipping'
      ? [`${sa.firstName} ${sa.lastName}`, sa.address1, sa.address2 || null, `${sa.postalCode} ${sa.city}`, sa.country, `Tél : ${sa.phone}`]
          .filter(Boolean).join('\n')
      : '';

    const data = {
      shoppingCardLink: `${prefix}/#/shopping-cart`,
      uid: user.uid,
      orderId,
      subject: isUpdate
        ? `[MODIFICATION] ${this.translateService.instant('NEW_ORDER_TITLE')}`
        : this.translateService.instant('NEW_ORDER_TITLE'),
      items: emailData,
      displayName: user.displayName,
      currency,
      currencySymbol,
      hasTva,
      totalHT: rawTotalHT,
      tva: rawTva,
      totalTTC: rawTotalHT + rawTva - promoDiscountRaw,
      deliveryMode,
      deliveryModeLabel,
      shippingAddress: deliveryMode === 'shipping' ? { ...shippingAddress } : null,
      shippingAddressFormatted,
      promoCode: appliedPromo?.code ?? null,
      promoDiscountPercent: appliedPromo?.discountPercent ?? null,
      promoDiscountAmount: promoDiscountRaw > 0 ? promoDiscountRaw : null,
      promoCategoryId: appliedPromo?.categoryId ?? null,
    };

    from(httpsCallable(this.fun, 'genericBrevoEmail')(data)).subscribe({
      next: result => console.log(result),
      error: err => console.error(err),
    });
  }
}
