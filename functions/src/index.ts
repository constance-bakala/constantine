// Firebase Config (Cloud Functions)
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

admin.initializeApp();

// Env config (firebase functions:config:set sendgrid.key="..." sendgrid.commend="..." sendgrid.welcome="..." gmail.email="...")
const API_KEY = functions.config().sendgrid?.key;
const TEMPLATE_ID_COMMEND = functions.config().sendgrid?.commend;
const TEMPLATE_ID_WELCOME = functions.config().sendgrid?.welcome;
const gmailSender = functions.config().gmail?.email;

if (!API_KEY) {
  console.warn('[Sendgrid] Missing config: sendgrid.key');
} else {
  sgMail.setApiKey(API_KEY);
}

// Helpers
function requireConfig(value: unknown, name: string): string {
  if (!value || typeof value !== 'string') {
    throw new Error(`Missing or invalid Firebase Functions config: ${name}`);
  }
  return value;
}

//// Welcome email ////////////
export const welcomeSendgridEmail = functions.auth.user().onCreate(async (user) => {
  // Si pas d’email, on ne peut pas envoyer
  if (!user.email) {
    console.log('[welcomeSendgridEmail] User created without email, skip', { uid: user.uid });
    return null;
  }

  const sender = requireConfig(gmailSender, 'gmail.email');
  const templateId = requireConfig(TEMPLATE_ID_WELCOME, 'sendgrid.welcome');

  const msg: sgMail.MailDataRequired = {
    to: user.email,
    from: sender,
    templateId,
    dynamicTemplateData: {
      subject: 'Bienvenu sur Délice Éternel',
      displayName: user.displayName ?? user.email,
      masksLink: 'https://delice-eternel-gabon.web.app/#/masks',
      dressesLink: 'https://delice-eternel-gabon.web.app/#/dresses',
      earingsLink: 'https://delice-eternel-gabon.web.app/#/earings',
    },
  };

  return sgMail.send(msg);
});

//// generic mail  ////////////////////
export const genericSendgridEmail = functions.https.onCall(async (data, context) => {
  // ✅ Correction : on veut refuser si PAS d’auth OU pas d’email
  const email = context.auth?.token?.email as string | undefined;
  if (!email) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Must be logged in with an email address'
    );
  }

  const sender = requireConfig(gmailSender, 'gmail.email');
  const templateId = requireConfig(TEMPLATE_ID_COMMEND, 'sendgrid.commend');

  // Validation minimale des données attendues
  const subject = typeof data?.subject === 'string' ? data.subject : 'Commande';
  const displayName = typeof data?.displayName === 'string' ? data.displayName : email;
  const items = Array.isArray(data?.items) ? data.items : data?.items ?? [];

  const msg: sgMail.MailDataRequired = {
    to: email,
    from: sender,
    templateId,
    dynamicTemplateData: {
      subject,
      displayName,
      items,
    },
  };

  console.log('[genericSendgridEmail] sending', { to: email, subject, itemsCount: Array.isArray(items) ? items.length : undefined });

  await sgMail.send(msg);
  return { success: true };
});
