import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import sharp from 'sharp';

/**
 * processUploadedCatalogImage
 *
 * Déclenché quand un fichier est uploadé dans catalog/{categoryId}/{itemId}/.
 * Génère 3 versions WebP optimisées et met à jour le record Firebase DB.
 *
 * Structure Storage cible après traitement :
 *   catalog/{categoryId}/{itemId}/thumb.webp   ← 200px
 *   catalog/{categoryId}/{itemId}/medium.webp  ← 600px
 *   catalog/{categoryId}/{itemId}/full.webp    ← 1200px
 */
export const processUploadedCatalogImage = functions
  .region('europe-west1')
  .storage.object()
  .onFinalize(async (object) => {
    const filePath  = object.name ?? '';
    const bucket    = admin.storage().bucket(object.bucket);

    // Ne traiter que les fichiers dans catalog/ qui ne sont pas déjà des webp optimisés
    if (!filePath.startsWith('catalog/')) return null;
    if (/\/(thumb|medium|full)\.webp$/.test(filePath)) return null;

    // Extraire categoryId / itemId / filename
    const parts = filePath.split('/');
    if (parts.length < 4) return null;          // catalog/catId/itemId/file
    const categoryId = parts[1];
    const itemId     = parts[2];
    const isCover    = parts[3].startsWith('cover');

    const tempInput = path.join(os.tmpdir(), `catalog_input_${Date.now()}`);

    // Télécharger le fichier original
    await bucket.file(filePath).download({ destination: tempInput });

    const sizes: { name: string; width: number }[] = [
      { name: 'thumb',  width: 200  },
      { name: 'medium', width: 600  },
      { name: 'full',   width: 1200 },
    ];

    const baseFolder = `catalog/${categoryId}/${itemId}`;
    const urls: Record<string, string> = {};

    for (const { name, width } of sizes) {
      const tempOut  = path.join(os.tmpdir(), `${name}_${Date.now()}.webp`);
      const destPath = `${baseFolder}/${name}.webp`;

      await sharp(tempInput)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(tempOut);

      await bucket.upload(tempOut, {
        destination: destPath,
        metadata: { contentType: 'image/webp' },
      });

      const [url] = await bucket.file(destPath).getSignedUrl({
        action: 'read',
        expires: '01-01-2099',
      });
      urls[name] = url;

      fs.unlinkSync(tempOut);
    }

    fs.unlinkSync(tempInput);

    // Mettre à jour le record DB avec les URLs WebP
    const db = admin.database();
    const itemRef = db.ref(`catalog/items/${itemId}`);
    const snap = await itemRef.once('value');
    if (!snap.exists()) return null;

    const updates: Record<string, any> = {
      [`images`]: [urls['full'], urls['medium'], urls['thumb']],
    };

    // La cover est déterminée par le fichier "cover.*"
    if (isCover) {
      updates['coverUrl'] = urls['medium'];
    }

    await itemRef.update(updates);
    return null;
  });
