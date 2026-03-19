import * as functions from 'firebase-functions/v1';

// ---------------------------------------------------------------------------
// Brevo Transactional Email API (templates)
// Variables d'environnement dans functions/.env :
//   BREVO_API_KEY          : clé API Brevo (xkeysib-...)
//   BREVO_FROM_EMAIL       : email expéditeur vérifié dans Brevo
//   BREVO_FROM_NAME        : nom expéditeur
//   BREVO_TEMPLATE_ORDER   : ID template commande   (défaut: 1)
//   BREVO_TEMPLATE_WELCOME : ID template bienvenue  (défaut: 2)
// ---------------------------------------------------------------------------

async function sendBrevoTemplate(params: {
  to: { email: string; name?: string };
  templateId: number;
  templateParams: Record<string, unknown>;
  subject?: string;
  bcc?: boolean;
}): Promise<void> {
  const apiKey = process.env['BREVO_API_KEY'];
  if (!apiKey) throw new Error('BREVO_API_KEY manquant dans functions/.env');

  const ownerEmail = process.env['BREVO_FROM_EMAIL'] ?? 'delice.eternel.gabon@gmail.com';

  const body: Record<string, unknown> = {
    sender: {
      email: ownerEmail,
      name:  process.env['BREVO_FROM_NAME']  ?? 'Délice Éternel',
    },
    to: [{ email: params.to.email, name: params.to.name ?? params.to.email }],
    templateId: params.templateId,
    params: params.templateParams,
  };

  if (params.bcc) {
    body['bcc'] = [{ email: ownerEmail, name: 'Délice Éternel (copie)' }];
  }

  if (params.subject) body['subject'] = params.subject;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brevo API ${response.status}: ${error}`);
  }
}

// ---------------------------------------------------------------------------
// Email de bienvenue — déclenché à la création d'un compte
// ---------------------------------------------------------------------------
export const welcomeBrevoEmail = functions.auth.user().onCreate(async (user) => {
  if (!user.email) return null;

  const templateId = parseInt(process.env['BREVO_TEMPLATE_WELCOME'] ?? '2', 10);
  const displayName = user.displayName ?? user.email;

  try {
    await sendBrevoTemplate({
      to: { email: user.email, name: displayName },
      templateId,
      templateParams: {
        displayName,
        masksLink:   'https://delice-eternel-gabon.web.app/masks',
        dressesLink: 'https://delice-eternel-gabon.web.app/dresses',
        earingsLink: 'https://delice-eternel-gabon.web.app/earings',
      },
    });
    console.log('[Brevo] welcomeBrevoEmail OK →', user.email);
  } catch (err) {
    console.error('[Brevo] welcomeBrevoEmail ERROR', err);
  }

  return null;
});

// ---------------------------------------------------------------------------
// Email de commande — appelé depuis Angular via httpsCallable
// ---------------------------------------------------------------------------
export const genericBrevoEmail = functions.https.onCall(async (data, context) => {
  const callerEmail = context.auth?.token?.email as string | undefined;
  if (!callerEmail) {
    throw new functions.https.HttpsError('failed-precondition', 'Must be logged in with an email address');
  }

  const templateId  = parseInt(process.env['BREVO_TEMPLATE_ORDER'] ?? '1', 10);
  const subject     = typeof data?.subject     === 'string' ? data.subject     : 'Votre commande';
  const displayName = typeof data?.displayName === 'string' ? data.displayName : callerEmail;
  const items       = Array.isArray(data?.items) ? data.items : [];
  const to          = typeof data?.email       === 'string' ? data.email       : callerEmail;

  const totalHT  = items.reduce((sum: number, item: any) =>
    sum + (item.price ?? 0) * (item.basketInfos?.selectedQuantity ?? 1), 0);
  const tva      = Math.round(totalHT * 0.10);
  const totalTTC = totalHT + tva;

  console.log('[Brevo] genericBrevoEmail →', { to, subject, itemsCount: items.length, totalTTC });

  try {
    await sendBrevoTemplate({
      to: { email: to, name: displayName },
      templateId,
      templateParams: { displayName, items, subject, totalHT, tva, totalTTC },
      subject,
      bcc: true,
    });
    return { success: true };
  } catch (err) {
    console.error('[Brevo] genericBrevoEmail ERROR', err);
    throw new functions.https.HttpsError('internal', "Erreur lors de l'envoi du mail");
  }
});
