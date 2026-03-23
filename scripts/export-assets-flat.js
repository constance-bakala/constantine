/**
 * Phase 0 — Export assets to flat directories
 *
 * Reads src/assets/{masks,dresses,jewellery}/ and copies each image
 * to export/{masques,robes,bijoux}/ with flat filenames:
 *   masks/mask-1/cover.webp     → export/masques/mask-1-cover.webp
 *   masks/mask-1/mask-1-b.webp  → export/masques/mask-1-b.webp
 *   dresses/dress-2/cover.jpeg  → export/robes/dress-2-cover.jpeg
 *   jewellery/earing-3/cover.webp → export/bijoux/earing-3-cover.webp
 *
 * When a .webp and .jpeg exist for the same "cover" slot, only the .webp is exported.
 *
 * Usage:  node scripts/export-assets-flat.js
 * Output: export/ at the root of the project
 */

const fs   = require('fs');
const path = require('path');

const ROOT    = path.join(__dirname, '..');
const ASSETS  = path.join(ROOT, 'src', 'assets');
const OUT_DIR = path.join(ROOT, 'export');

const CATEGORIES = [
  { src: 'masks',     out: 'masques' },
  { src: 'dresses',   out: 'robes'   },
  { src: 'jewellery', out: 'bijoux'  },
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function flatName(itemId, filename) {
  // If filename already starts with the item id (e.g. "mask-1-b.webp"), keep it.
  // Otherwise it's "cover.ext" → rename to "{itemId}-cover.ext".
  if (filename.startsWith(itemId)) return filename;
  return `${itemId}-${filename}`;
}

let total = 0;
let skipped = 0;

for (const { src, out } of CATEGORIES) {
  const srcDir = path.join(ASSETS, src);
  const outDir = path.join(OUT_DIR, out);

  if (!fs.existsSync(srcDir)) {
    console.warn(`[SKIP] Source directory not found: ${srcDir}`);
    continue;
  }

  ensureDir(outDir);

  // Build a set of already-exported basenames (without extension) to skip jpeg when webp exists
  const exportedBase = new Set();

  // Two passes: webp first, then jpeg (so webp wins)
  const itemDirs = fs.readdirSync(srcDir).filter(name =>
    fs.statSync(path.join(srcDir, name)).isDirectory()
  );

  for (const pass of ['webp', 'jpeg']) {
    for (const itemId of itemDirs) {
      const itemDir = path.join(srcDir, itemId);
      const files   = fs.readdirSync(itemDir);

      for (const file of files) {
        const ext = path.extname(file).slice(1).toLowerCase();
        if (ext !== pass) continue;

        const baseName = path.basename(file, `.${ext}`);
        const key      = `${itemId}-${baseName}`;

        if (exportedBase.has(key)) {
          skipped++;
          continue; // webp already exported for this slot
        }

        const destName = flatName(itemId, file);
        const src_     = path.join(itemDir, file);
        const dest     = path.join(outDir, destName);

        fs.copyFileSync(src_, dest);
        exportedBase.add(key);
        total++;
        console.log(`  ✓ ${out}/${destName}`);
      }
    }
  }
}

console.log(`\nDone. ${total} files exported, ${skipped} jpeg duplicates skipped.`);
console.log(`Output: ${OUT_DIR}`);
