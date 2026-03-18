/**
 * generate-groups.js
 *
 * Scanne les répertoires assets et regénère automatiquement
 * src/app/shared/helpers/items-groups.const.ts
 *
 * Usage :
 *   node generate-groups.js
 *
 * À relancer après chaque ajout, suppression ou déplacement d'image.
 */

const fs   = require('fs');
const path = require('path');

const ASSETS_BASE = path.join(__dirname, 'src', 'assets');
const OUTPUT_FILE = path.join(
  __dirname,
  'src', 'app', 'shared', 'helpers', 'items-groups.const.ts'
);

const CATEGORIES = [
  { dir: 'masks',     prefix: 'mask',   constName: 'MASK_GROUPS'   },
  { dir: 'dresses',   prefix: 'dress',  constName: 'DRESS_GROUPS'  },
  { dir: 'jewellery', prefix: 'earing', constName: 'EARING_GROUPS' },
];

function readGroups(categoryDir, prefix) {
  const dirPath = path.join(ASSETS_BASE, categoryDir);

  if (!fs.existsSync(dirPath)) {
    console.warn(`  ABSENT : ${dirPath}`);
    return [];
  }

  return fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(e => e.isDirectory() && e.name.startsWith(`${prefix}-`))
    .sort((a, b) => {
      const n = name => parseInt(name.replace(`${prefix}-`, ''), 10);
      return n(a.name) - n(b.name);
    })
    .map(entry => {
      const id          = parseInt(entry.name.replace(`${prefix}-`, ''), 10);
      const groupDir    = path.join(dirPath, entry.name);
      const extraImages = fs.readdirSync(groupDir)
        .filter(f => f !== 'cover.png' && /\.(png|jpg|jpeg|webp)$/i.test(f))
        .sort();

      return { id, extraImages };
    });
}

function formatGroup({ id, extraImages }) {
  if (!extraImages.length) return `  { id: ${id} },`;
  const imgs = extraImages.map(f => `'${f}'`).join(', ');
  return `  { id: ${id}, extraImages: [${imgs}] },`;
}

function generateFile(categories) {
  const header = `\
/**
 * CE FICHIER EST GÉNÉRÉ AUTOMATIQUEMENT — ne pas éditer manuellement.
 * Pour le regénérer : node generate-groups.js
 *
 * Chaque groupe représente un objet physique unique.
 * Convention d'asset :
 *   assets/masks/mask-1/cover.png       → image principale
 *   assets/masks/mask-1/mask-1-b.png    → vue additionnelle
 */

export interface ItemGroupDef {
  id: number;
  extraImages?: string[];
}

`;

  const blocks = categories.map(({ constName, groups }) => {
    const lines = groups.map(formatGroup).join('\n');
    return `export const ${constName}: ItemGroupDef[] = [\n${lines}\n];\n`;
  });

  return header + blocks.join('\n');
}

// --- main ---
console.log('Génération de items-groups.const.ts...\n');

const categories = CATEGORIES.map(cat => {
  const groups = readGroups(cat.dir, cat.prefix);
  console.log(`  ${cat.constName} : ${groups.length} groupes`);
  return { constName: cat.constName, groups };
});

const content = generateFile(categories);
fs.writeFileSync(OUTPUT_FILE, content, 'utf8');

console.log(`\nFichier écrit : ${OUTPUT_FILE}`);
