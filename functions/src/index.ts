// Firebase Config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// const db = admin.firestore();
import * as sgMail from '@sendgrid/mail';
//const cors = require('cors')({origin: true});
admin.initializeApp();

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID_COMMEND = functions.config().sendgrid.commend;
const TEMPLATE_ID_WELCOME = functions.config().sendgrid.welcome;
const gmailSender = functions.config().gmail.email;

sgMail.setApiKey(API_KEY);

//// Welcome email ////////////
export const welcomeSendgridEmail = functions.auth.user().onCreate(async user => {
  const msg = {
    to: user.email,
    from: gmailSender,
    templateId: TEMPLATE_ID_WELCOME,
    dynamic_template_data: {
      subject: 'Bienvenu sur Délice Éternel',
      displayName: user.displayName ?? user.email,
      masksLink: "https://delice-eternel-gabon.web.app/#/masks",
      dressesLink: "https://delice-eternel-gabon.web.app/#/dresses",
      earingsLink: "https://delice-eternel-gabon.web.app/#/earings"
    },
  };
  return sgMail.send(msg);
});

//// generic mail  ////////////////////
export const genericSendgridEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth && !context.auth.token.email) {
    throw new functions.https.HttpsError('failed-precondition', 'Must be logged with an email address');
  }
  const msg = {
    to: context.auth.token.email,
    from: gmailSender,
    templateId: TEMPLATE_ID_COMMEND,
    dynamic_template_data: {
      subject: data.subject,
      displayName: data.displayName,
      items: data.items,
    },
  };
  console.log(msg);
  //cors(data, context, async () => {
  await sgMail.send(msg);
  //});
  return {success: true}
});
