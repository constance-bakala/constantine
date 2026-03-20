/**
 * Génère des fichiers cover.jpeg (280 px, qualité 80) à partir des cover.webp
 * dans masks/ et jewellery/ pour les mails (compatibilité Outlook / clients sans WebP).
 *
 * Usage : node scripts/generate-email-jpegs.js
 *
 * À relancer après chaque ajout d'image + convert-to-webp.js.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIRS = [
  path.join(__dirname, '../src/assets/masks'),
  path.join(__dirname, '../src/assets/jewellery'),
];

const EMAIL_WIDTH = 280;
const QUALITY    = 80;

async function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (entry.isFile() && entry.name === 'cover.webp') {
      const outPath = path.join(path.dirname(fullPath), 'cover.jpeg');
      try {
        await sharp(fullPath)
          .resize({ width: EMAIL_WIDTH })
          .jpeg({ quality: QUALITY })
          .toFile(outPath);
        console.log(`✓ ${path.relative(process.cwd(), outPath)}`);
      } catch (err) {
        console.error(`✗ ${path.relative(process.cwd(), fullPath)}: ${err.message}`);
      }
    }
  }
}

(async () => {
  for (const dir of DIRS) {
    console.log(`\nTraitement de ${dir}`);
    await processDir(dir);
  }
  console.log('\nGénération terminée.');
})();
