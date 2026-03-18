import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp();
}

export {welcomeSendgridEmail, genericSendgridEmail} from './sendgridMails';
