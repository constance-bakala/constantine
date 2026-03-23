/**
 * Seed Firebase Realtime Database — config/i18n
 * Copie fr.json et en.json dans config/i18n/fr et config/i18n/en
 * Usage : node scripts/seed-firebase-config.mjs
 */
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey:            'AIzaSyBLCfZxzkybYbWJSrJGllI3X9sYtS6VZgw',
  authDomain:        'delice-eternel-gabon.firebaseapp.com',
  databaseURL:       'https://delice-eternel-gabon.firebaseio.com',
  projectId:         'delice-eternel-gabon',
  storageBucket:     'delice-eternel-gabon.appspot.com',
  messagingSenderId: '528655916572',
  appId:             '1:528655916572:web:73ef9aa553b17c49bdc9d9',
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

const fr = JSON.parse(readFileSync(join(__dirname, '../src/assets/i18n/fr.json'), 'utf8'));
const en = JSON.parse(readFileSync(join(__dirname, '../src/assets/i18n/en.json'), 'utf8'));

console.log('Upload fr.json → config/i18n/fr …');
await set(ref(db, 'config/i18n/fr'), fr);
console.log('Upload en.json → config/i18n/en …');
await set(ref(db, 'config/i18n/en'), en);
console.log('✓ Done');
process.exit(0);
