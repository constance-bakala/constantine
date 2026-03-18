import * as functions from 'firebase-functions';
import sgMail from '@sendgrid/mail';

type SendgridConfig = {
  apiKey: string;
  from: string;
  templateWelcome?: string;
  templateCommend?: string;
};

let cached: { cfg: SendgridConfig; ready: boolean } | null = null;

function readConfig(): SendgridConfig {
  // ✅ Priorité au .env / variables d’environnement
  const apiKey = process.env.SENDGRID_API_KEY || functions.config().sendgrid?.key;
  const from = process.env.SENDGRID_FROM || functions.config().sendgrid?.from || functions.config().gmail?.email;

  const templateWelcome =
    process.env.SENDGRID_TEMPLATE_WELCOME || functions.config().sendgrid?.welcome || process.env.SENDGRID_TEMPLATE_ID;

  const templateCommend =
    process.env.SENDGRID_TEMPLATE_COMMEND || functions.config().sendgrid?.commend || process.env.SENDGRID_TEMPLATE_ID;

  if (!apiKey || !from) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'SendGrid non configuré (SENDGRID_API_KEY + SENDGRID_FROM) ou config Firebase manquante'
    );
  }

  return { apiKey, from, templateWelcome, templateCommend };
}

function getSendgrid(): SendgridConfig {
  if (cached?.ready) return cached.cfg;

  const cfg = readConfig();
  sgMail.setApiKey(cfg.apiKey);

  cached = { cfg, ready: true };
  return cfg;
}

function buildMsg(params: {
  to: string;
  from: string;
  subject?: string;
  text?: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, any>;
}) {
  const { to, from, subject, text, templateId, dynamicTemplateData } = params;

  // Template SendGrid (si fourni)
  if (templateId) {
    return {
      to,
      from,
      templateId,
      dynamicTemplateData: dynamicTemplateData ?? {},
    } as any;
  }

  // Sinon email simple
  return {
    to,
    from,
    subject: subject ?? 'Message',
    text: text ?? '',
  } as any;
}

//// Welcome email ////////////
export const welcomeSendgridEmail = functions.auth.user().onCreate(async (user) => {
  const { from, templateWelcome } = getSendgrid();

  if (!user.email) return null;

  const msg = buildMsg({
    to: user.email,
    from,
    templateId: templateWelcome,
    dynamicTemplateData: {
      subject: 'Bienvenu sur Délice Éternel',
      displayName: user.displayName ?? user.email,
      masksLink: 'https://delice-eternel-gabon.web.app/#/masks',
      dressesLink: 'https://delice-eternel-gabon.web.app/#/dresses',
      earingsLink: 'https://delice-eternel-gabon.web.app/#/earings',
    },
    // fallback si pas de template
    subject: 'Bienvenu sur Délice Éternel',
    text: `Bonjour,

Votre compte a bien été créé.
Vous pouvez dès à présent passer commande.

À très bientôt !`,
  });

  try {
    await sgMail.send(msg);
    console.log('[SendGrid] welcomeSendgridEmail OK →', user.email);
  } catch (err) {
    console.error('[SendGrid] welcomeSendgridEmail ERROR', err);
  }

  return null;
});

//// Generic email ////////////
export const genericSendgridEmail = functions.https.onCall(async (data, context) => {
  // ✅ check auth robuste
  const callerEmail = context.auth?.token?.email as string | undefined;
  if (!callerEmail) {
    throw new functions.https.HttpsError('failed-precondition', 'Must be logged in with an email address');
  }

  const { from, templateCommend } = getSendgrid();

  // Validation minimale des données
  const subject = typeof data?.subject === 'string' ? data.subject : 'Commande';
  const displayName = typeof data?.displayName === 'string' ? data.displayName : callerEmail;
  const items = Array.isArray(data?.items) ? data.items : [];

  // cible : si tu veux envoyer à une adresse passée en paramètre, sinon à l’appelant
  const to = typeof data?.email === 'string' ? data.email : callerEmail;

  const msg = buildMsg({
    to,
    from,
    templateId: templateCommend,
    dynamicTemplateData: {
      subject,
      displayName,
      items,
    },
    // fallback si pas de template
    subject,
    text: typeof data?.text === 'string' ? data.text : `Nouvelle commande (${items.length} article(s))`,
  });

  console.log('[genericSendgridEmail] sending', { to, subject, itemsCount: items.length });

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (err) {
    console.error('[SendGrid] genericSendgridEmail ERROR', err);
    throw new functions.https.HttpsError('internal', 'Erreur lors de l’envoi du mail');
  }
});
