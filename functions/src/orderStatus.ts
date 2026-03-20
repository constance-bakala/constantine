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

type OrderStatus = 'pending' | 'ready' | 'paid';

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
  const status: OrderStatus | undefined = ['pending', 'ready', 'paid'].includes(data?.status) ? data.status : undefined;

  if (!orderId || !status) {
    throw new functions.https.HttpsError('invalid-argument', 'orderId et status sont requis.');
  }

  // 3. Lire la commande existante
  const orderRef = admin.database().ref(`orders/${orderId}`);
  const orderSnap = await orderRef.once('value');

  if (!orderSnap.exists()) {
    throw new functions.https.HttpsError('not-found', `Commande ${orderId} introuvable.`);
  }

  const order = orderSnap.val() as Record<string, any>;

  // 4. Mettre à jour le statut
  await orderRef.update({ status, updatedAt: Date.now() });

  console.log(`[orderStatus] ${orderId} → ${status} (par ${uid})`);

  // 5. Si la commande est prête, notifier le client par email
  if (status === 'ready') {
    const customerEmail: string | undefined = order.customerEmail;
    const customerName: string  = order.customerName ?? customerEmail ?? 'Client';
    const items: unknown[]      = Array.isArray(order.items) ? order.items : [];

    if (!customerEmail) {
      console.warn(`[orderStatus] Pas d'email client pour la commande ${orderId}`);
      return { success: true, emailSent: false };
    }

    const templateId = parseInt(process.env['BREVO_TEMPLATE_ORDER_READY'] ?? '3', 10);

    try {
      await sendBrevoTemplate({
        to: { email: customerEmail, name: customerName },
        templateId,
        templateParams: {
          customerName,
          orderId,
          items,
          paymentLink: `https://delice-eternel-gabon.web.app/shopping-cart`,
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

  return { success: true };
});
