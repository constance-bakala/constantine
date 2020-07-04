// Firebase Config
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
//const cors = require('cors')({origin: true});
admin.initializeApp();
// const db = admin.firestore();
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.templateid;
const gmailSender = functions.config().gmail.email;

sgMail.setApiKey(API_KEY);

//// Welcome email ////////////
export const welcomeSendgridEmail = functions.auth.user().onCreate(async user => {
  const msg = {
    to: user.email,
    from: gmailSender,
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      subject: 'Bienvenu sur délice éternel',
      name: user.displayName ?? user.email,
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
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      subject: data.subject,
      name: data.text,
    },
  };
  //cors(data, context, async () => {
    await sgMail.send(msg);
  //});
  return {success: true}
});
