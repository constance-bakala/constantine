import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import { sendBrevoTemplate } from './brevoMails';

// ---------------------------------------------------------------------------
// resendPaymentEmail — callable Firebase Function
//
// Payload attendu :
//   orderId : string  — clé push de la commande dans orders/
//
// Vérifie que l'appelant est bien le propriétaire de la commande (uid match).
// Vérifie que le statut est 'ready' avant de renvoyer l'email.
// ---------------------------------------------------------------------------

export const resendPaymentEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Vous devez être connecté.');
  }

  const uid = context.auth.uid;
  const orderId: string | undefined = typeof data?.orderId === 'string' ? data.orderId : undefined;

  if (!orderId) {
    throw new functions.https.HttpsError('invalid-argument', 'orderId est requis.');
  }

  // Seul un admin peut renvoyer l'email de paiement
  const adminSnap = await admin.database().ref(`admins/${uid}`).once('value');
  if (!adminSnap.exists()) {
    throw new functions.https.HttpsError('permission-denied', 'Accès réservé aux administrateurs.');
  }

  const orderSnap = await admin.database().ref(`orders/${orderId}`).once('value');
  if (!orderSnap.exists()) {
    throw new functions.https.HttpsError('not-found', `Commande ${orderId} introuvable.`);
  }

  const order = orderSnap.val() as Record<string, any>;

  if (order.status !== 'ready') {
    throw new functions.https.HttpsError('failed-precondition', 'La commande n\'est pas encore prête.');
  }

  const customerEmail: string | undefined = order.customerEmail;
  if (!customerEmail) {
    throw new functions.https.HttpsError('failed-precondition', 'Aucun email associé à cette commande.');
  }

  const customerName: string = order.customerName ?? customerEmail;
  const items: any[] = Array.isArray(order.items) ? order.items : [];

  const EUR_TO_XAF = 655.957;
  const itemsWithPrice = items.map((item) => {
    const qty = item?.basketInfos?.selectedQuantity ?? 1;
    const lineXAF = Math.round((item?.price ?? 0) * qty * EUR_TO_XAF);
    return { ...item, linePriceFormatted: lineXAF.toLocaleString('fr-FR') + ' FCFA' };
  });
  const totalXAF = Math.round(
    itemsWithPrice.reduce((sum, item) => {
      const qty = item?.basketInfos?.selectedQuantity ?? 1;
      return sum + (item?.price ?? 0) * qty;
    }, 0) * EUR_TO_XAF
  );
  const paymentAmountXAF = totalXAF.toLocaleString('fr-FR') + ' FCFA';
  const paymentPhone = process.env['PAYMENT_PHONE'] ?? '+24177601044';

  const templateId = parseInt(process.env['BREVO_TEMPLATE_ORDER_READY'] ?? '4', 10);

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
    },
  });

  console.log(`[resendPaymentEmail] Email renvoyé → ${customerEmail} (commande ${orderId})`);
  return { success: true };
});
