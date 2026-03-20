/**
 * Convertit tous les PNG de masks/ et jewellery/ en WebP.
 * Les fichiers PNG originaux sont supprimés après conversion réussie.
 *
 * Usage : node scripts/convert-to-webp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIRS = [
  path.join(__dirname, '../src/assets/masks'),
  path.join(__dirname, '../src/assets/jewellery'),
];

const QUALITY = 85; // qualité WebP (0-100)

async function convertDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await convertDir(fullPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      const outPath = fullPath.replace(/\.png$/i, '.webp');
      try {
        await sharp(fullPath).webp({ quality: QUALITY }).toFile(outPath);
        fs.unlinkSync(fullPath); // supprime le PNG original
        console.log(`✓ ${path.relative(process.cwd(), fullPath)} → .webp`);
      } catch (err) {
        console.error(`✗ ${entry.name}: ${err.message}`);
      }
    }
  }
}

(async () => {
  for (const dir of DIRS) {
    console.log(`\nTraitement de ${dir}`);
    await convertDir(dir);
  }
  console.log('\nConversion terminée.');
})();
