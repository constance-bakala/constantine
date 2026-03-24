import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp();
}

export { welcomeBrevoEmail, genericBrevoEmail } from './brevoMails';
export { updateOrderStatus } from './orderStatus';
export { resendPaymentEmail } from './resendPaymentEmail';
export { processUploadedCatalogImage } from './processUploadedCatalogImage';