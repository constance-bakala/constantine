import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import { sendBrevoTemplate } from './brevoMails';

// ---------------------------------------------------------------------------
// updateOrderStatus — callable Firebase Function (admin only)
//
// Payload attendu :
//   orderId  : string  — clé push de la commande dans orders/
//   status   : 'pending' | 'ready' | 'paid'
//
// Vérifie que l'appelant est dans admins/{uid} avant toute action.
// Quand status === 'ready', envoie un email Brevo au client.
// ---------------------------------------------------------------------------

type OrderStatus = 'pending' | 'ready' | 'paid' | 'shipped' | 'cancelled';

export const updateOrderStatus = functions.https.onCall(async (data, context) => {
  // 1. Authentification obligatoire
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Vous devez être connecté.');
  }

  const uid = context.auth.uid;

  // 2. Vérification que l'utilisateur est admin
  const adminSnap = await admin.database().ref(`admins/${uid}`).once('value');
  if (!adminSnap.exists()) {
    throw new functions.https.HttpsError('permission-denied', 'Accès réservé aux administrateurs.');
  }

  const orderId: string | undefined = typeof data?.orderId === 'string' ? data.orderId : undefined;
  const status: OrderStatus | undefined = ['pending', 'ready', 'paid', 'shipped', 'cancelled'].includes(data?.status) ? data.status : undefined;
  const trackingUrl: string | undefined = typeof data?.trackingUrl === 'string' && data.trackingUrl.trim() ? data.trackingUrl.trim() : undefined;
  const carrierName: string | undefined = typeof data?.carrierName === 'string' && data.carrierName.trim() ? data.carrierName.trim() : undefined;
  const shippingCost: number | undefined = typeof data?.shippingCost === 'number' && data.shippingCost >= 0 ? data.shippingCost : undefined;

  if (!orderId || !status) {
    throw new functions.https.HttpsError('invalid-argument', 'orderId et status sont requis.');
  }

  if (status === 'shipped' && !trackingUrl) {
    throw new functions.https.HttpsError('invalid-argument', 'L\'URL de suivi est obligatoire pour expédier une commande.');
  }

  // 3. Lire la commande existante
  const orderRef = admin.database().ref(`orders/${orderId}`);
  const orderSnap = await orderRef.once('value');

  if (!orderSnap.exists()) {
    throw new functions.https.HttpsError('not-found', `Commande ${orderId} introuvable.`);
  }

  const order = orderSnap.val() as Record<string, any>;

  // Annulation uniquement depuis 'pending' ou 'ready'
  if (status === 'cancelled' && !['pending', 'ready'].includes(order.status)) {
    throw new functions.https.HttpsError('failed-precondition', 'Seules les commandes en attente ou prêtes peuvent être annulées.');
  }

  // 4. Mettre à jour le statut (+ trackingUrl si expédition, + shippingCost si présent)
  const orderUpdate: Record<string, any> = { status, updatedAt: Date.now() };
  if (status === 'shipped' && trackingUrl) {
    orderUpdate['trackingUrl'] = trackingUrl;
    if (carrierName) orderUpdate['carrierName'] = carrierName;
  }
  if (status === 'ready' && shippingCost !== undefined) {
    orderUpdate['shippingCost'] = shippingCost;
  }
  await orderRef.update(orderUpdate);

  // 4b. Annulation : restaurer le stock et supprimer la commande de la vue utilisateur
  if (status === 'cancelled') {
    const items: any[] = Array.isArray(order.items) ? order.items : Object.values(order.items ?? {});
    await Promise.all(items.map((item: any) => {
      const ref = item?.reference;
      const qty: number = item?.basketInfos?.selectedQuantity ?? 1;
      if (!ref) return Promise.resolve();
      return admin.database().ref(`stock/${ref}`).transaction((current: any) => {
        if (current === null) return { available: qty };
        return { ...current, available: (current.available ?? 0) + qty };
      });
    }));
    const cancelUid: string | undefined = typeof order.uid === 'string' ? order.uid : undefined;
    if (cancelUid) {
      await admin.database().ref(`users/${cancelUid}/orderStatus/${orderId}`).remove();
    }
    console.log(`[orderStatus] ${orderId} annulée — stock restauré`);
    return { success: true };
  }

  // 4c. Propager le statut vers users/{uid}/orderStatus/{orderId} si uid connu
  const customerUid: string | undefined = typeof order.uid === 'string' ? order.uid : undefined;
  if (customerUid) {
    const userOrderRef = admin.database().ref(`users/${customerUid}/orderStatus/${orderId}`);
    const updates: Record<string, any> = { status };
    if (status === 'ready' && shippingCost !== undefined) {
      updates['shippingCost'] = shippingCost;
    }
    // Quand expédié : s'assurer que les items sont présents pour la page historique
    if (status === 'shipped') {
      const existingSnap = await userOrderRef.once('value');
      const existing = existingSnap.val() ?? {};
      if (!existing.items || (Array.isArray(existing.items) && existing.items.length === 0)) {
        const items: any[] = Array.isArray(order.items) ? order.items : [];
        if (items.length > 0) updates['items'] = items;
      }
    }
    await userOrderRef.update(updates);
  }

  console.log(`[orderStatus] ${orderId} → ${status} (par ${uid})`);

  // 5. Si la commande est prête, notifier le client par email
  if (status === 'ready') {
    const customerEmail: string | undefined = order.customerEmail;
    const customerName: string  = order.customerName ?? customerEmail ?? 'Client';
    const items: any[]          = Array.isArray(order.items) ? order.items : [];
    const deliveryModeLabels: Record<string, string> = {
      pickup:   'Retrait au Gabon',
      shipping: 'Expédition internationale',
    };
    const deliveryModeLabel: string = deliveryModeLabels[order.deliveryMode] ?? '';

    if (!customerEmail) {
      console.warn(`[orderStatus] Pas d'email client pour la commande ${orderId}`);
      return { success: true, emailSent: false };
    }

    // Lire le taux TVA depuis Firebase config
    const tvaRateSnap = await admin.database().ref('config/tvaRate').once('value');
    const tvaRate = typeof tvaRateSnap.val() === 'number' ? tvaRateSnap.val() : 0;

    // Calcul du total en FCFA — arrondi à la centaine (même logique que l'admin)
    const EUR_TO_XAF = 655.957;
    const toXAF = (eur: number) => Math.round(eur * EUR_TO_XAF / 100) * 100;
    const hasTva = order.deliveryMode === 'shipping' && tvaRate > 0;

    const itemsWithPrice = items.map((item) => {
      const qty = item?.basketInfos?.selectedQuantity ?? 1;
      const lineXAF = toXAF((item?.price ?? 0) * qty);
      return { ...item, linePriceFormatted: lineXAF.toLocaleString('fr-FR') + ' FCFA' };
    });
    const itemsHtXAF = itemsWithPrice.reduce((sum, item) => {
      const qty = item?.basketInfos?.selectedQuantity ?? 1;
      return sum + toXAF((item?.price ?? 0) * qty);
    }, 0);
    const tvaXAF         = hasTva ? Math.round(itemsHtXAF * tvaRate / 100) * 100 : 0;
    const shippingCostXAF = shippingCost ?? 0; // déjà en XAF, pas de conversion
    const totalXAF        = itemsHtXAF + tvaXAF + shippingCostXAF;

    const paymentAmountXAF   = totalXAF.toLocaleString('fr-FR') + ' FCFA';
    const itemsTotalFormatted = itemsHtXAF.toLocaleString('fr-FR') + ' FCFA';
    const tvaFormatted        = hasTva ? tvaXAF.toLocaleString('fr-FR') + ' FCFA' : null;
    const shippingCostFormatted = shippingCostXAF > 0 ? shippingCostXAF.toLocaleString('fr-FR') + ' FCFA' : null;
    const paymentPhone = process.env['PAYMENT_PHONE'] ?? '+24177601044';

    const templateId = parseInt(process.env['BREVO_TEMPLATE_ORDER_READY'] ?? '4', 10);

    try {
      await sendBrevoTemplate({
        to: { email: customerEmail, name: customerName },
        templateId,
        templateParams: {
          subject: `Votre commande est prête — ${paymentAmountXAF} à régler`,
          customerName,
          orderId,
          items: itemsWithPrice,
          paymentPhone,
          paymentAmountXAF,
          itemsTotalFormatted,
          tvaFormatted,
          hasTva,
          shippingCostFormatted,
          deliveryModeLabel,
          shippingAddress: order.shippingAddress ?? null,
        },
      });
      console.log(`[orderStatus] Email "commande prête" envoyé → ${customerEmail}`);
      return { success: true, emailSent: true };
    } catch (err) {
      console.error('[orderStatus] Erreur envoi email commande prête', err);
      // Ne pas bloquer la mise à jour de statut si l'email échoue
      return { success: true, emailSent: false };
    }
  }

  // 6. Si la commande est expédiée, envoyer l'email de suivi au client
  if (status === 'shipped' && trackingUrl) {
    const customerEmail: string | undefined = order.customerEmail;
    const customerName: string = order.customerName ?? order.customerEmail ?? 'Client';
    const items: any[] = Array.isArray(order.items) ? order.items : [];
    const deliveryModeLabels: Record<string, string> = {
      pickup:   'Retrait au Gabon',
      shipping: 'Expédition internationale',
    };
    const deliveryModeLabel: string = deliveryModeLabels[order.deliveryMode] ?? '';

    if (customerEmail) {
      const EUR_TO_XAF = 655.957;
      const toXAF = (eur: number) => Math.round(eur * EUR_TO_XAF / 100) * 100;

      // Lire le taux TVA depuis Firebase config
      const tvaRateShippedSnap = await admin.database().ref('config/tvaRate').once('value');
      const tvaRateShipped = typeof tvaRateShippedSnap.val() === 'number' ? tvaRateShippedSnap.val() : 0;
      const hasTvaShipped = order.deliveryMode === 'shipping' && tvaRateShipped > 0;

      const itemsWithPrice = items.map((item) => {
        const qty = item?.basketInfos?.selectedQuantity ?? 1;
        const lineXAF = toXAF((item?.price ?? 0) * qty);
        return { ...item, linePriceFormatted: lineXAF.toLocaleString('fr-FR') + ' FCFA' };
      });
      const itemsOnlyXAF = itemsWithPrice.reduce((sum, item) => {
        const qty = item?.basketInfos?.selectedQuantity ?? 1;
        return sum + toXAF((item?.price ?? 0) * qty);
      }, 0);
      const tvaShippedXAF          = hasTvaShipped ? Math.round(itemsOnlyXAF * tvaRateShipped / 100) * 100 : 0;
      const shippedShippingCostXAF = typeof order.shippingCost === 'number' ? order.shippingCost : 0;
      const totalXAF               = itemsOnlyXAF + tvaShippedXAF + shippedShippingCostXAF;

      const totalAmountXAF      = totalXAF.toLocaleString('fr-FR') + ' FCFA';
      const itemsTotalFormatted = itemsOnlyXAF.toLocaleString('fr-FR') + ' FCFA';
      const tvaShippedFormatted = hasTvaShipped ? tvaShippedXAF.toLocaleString('fr-FR') + ' FCFA' : null;
      const shippingCostFormatted = shippedShippingCostXAF > 0
        ? shippedShippingCostXAF.toLocaleString('fr-FR') + ' FCFA'
        : null;
      const shippedTemplateId = parseInt(process.env['BREVO_TEMPLATE_ORDER_SHIPPED'] ?? '5', 10);

      try {
        await sendBrevoTemplate({
          to: { email: customerEmail, name: customerName },
          templateId: shippedTemplateId,
          templateParams: {
            subject: `Votre commande Délice Éternel est en route !`,
            customerName,
            orderId,
            items: itemsWithPrice,
            totalAmountXAF,
            itemsTotalFormatted,
            tvaFormatted: tvaShippedFormatted,
            hasTva: hasTvaShipped,
            shippingCostFormatted,
            trackingUrl,
            carrierName: carrierName ?? '',
            deliveryModeLabel,
            shippingAddress: order.shippingAddress ?? null,
            customsNote: order.deliveryMode === 'shipping'
              ? 'Des droits de douane peuvent être exigés à la réception selon votre pays. Ces frais ne sont pas inclus dans le montant de votre commande.'
              : null,
          },
        });
        console.log(`[orderStatus] Email "commande expédiée" envoyé → ${customerEmail}`);
        return { success: true, emailSent: true };
      } catch (err) {
        console.error('[orderStatus] Erreur envoi email commande expédiée', err);
        return { success: true, emailSent: false };
      }
    }
  }

  return { success: true };
});
