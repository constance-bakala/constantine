// Firebase Config
import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends email to user after signup
export const welcomeEmail = functions.auth.user().onCreate(async user => {
  const mailOptions = {
    to: user.email,
    from: gmailEmail,
    subject: 'Bienvenu sur délice éternel ' + user.displayName,
    name: user.displayName,
    text: 'Vous pouvez dès à présent nous envoyer vos commandes, alors n\'attendez plus!'
  };

  try {
    await mailTransport.sendMail(mailOptions);
    console.log(`New subscription confirmation email sent to:`, user.email);
  } catch (error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;

});

// Sends an email confirmation with nodemailer using google account when a user subscribes
// exports.genericEmail = functions.database.ref('/users/{uid}').onWrite(async (change) => {
exports.genericEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth && !context.auth.token.email) {
    throw new functions.https.HttpsError('failed-precondition', 'Must be logged with an email address');
  }

  const mailOptions = {
    to: data.email,
    from: gmailEmail,
    subject: data.subject,
    text: data.text,
  };

  try {
    await mailTransport.sendMail(mailOptions);
    console.log(`***>Nouvelle commande envoyee a: `, data.email);
  } catch (error) {
    console.log(`---> Erreur d'envoie à destination de :`, data.email);
    console.log(`---> Erreur d'envoie de la commande avec le compte :`, gmailEmail + '/' + gmailPassword);
    console.error('---> Erreur 1/3 pour context= ', context);
    console.error('---> Erreur 2/3 pour email= ', data.email);
    console.error('---> Erreur 3/3 pour error= ', error);
  }
  return null;
});
