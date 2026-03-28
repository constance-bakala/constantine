import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

// ---------------------------------------------------------------------------
// tryonVirtual — Firebase Callable Function
//
// Génère une photo de mannequin portant un vêtement via IDM-VTON (Replicate).
// Modèle : cuuupid/idm-vton  — ECCV 2024, DressCode pour les robes
//
// Payload :
//   coverUrl      : string  — URL publique de la photo du vêtement (garm_img)
//   itemId        : string  — pushKey Firebase de l'article
//   categoryId    : string  — préfixe de la catégorie (ex: "robes")
//   garmentType   : string  — 'upperbody' | 'lowerbody' | 'dresses' (défaut: 'dresses')
//   garmentDesc   : string? — description textuelle du vêtement (améliore la qualité)
//   modelImageUrl : string? — URL image mannequin (optionnel, utilise le défaut sinon)
//
// Variables d'environnement requises :
//   REPLICATE_API_TOKEN    — token API Replicate (pay-as-you-go)
//   TRYON_DEFAULT_MODEL_URL — URL image mannequin par défaut (optionnel)
// ---------------------------------------------------------------------------

const REPLICATE_API  = 'https://api.replicate.com/v1';
const IDM_VERSION    = '0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985';

// Image mannequin par défaut — dress-1 du catalogue
const DEFAULT_MODEL_URL = 'https://firebasestorage.googleapis.com/v0/b/delice-eternel-gabon.appspot.com/o/catalog%2Fdress%2F-OoOXNQmwFQkg7piyOn_%2Fcover.jpeg?alt=media&token=9530eea1-7b80-4979-903e-f00005397b64';

/** Convertit le garmentType interne vers la catégorie IDM-VTON */
function toIdmCategory(garmentType: string): string {
  if (garmentType === 'lowerbody') return 'lower_body';
  if (garmentType === 'dresses')   return 'dresses';
  return 'upper_body'; // 'upperbody' par défaut
}

export const tryonVirtual = functions
  .runWith({ timeoutSeconds: 300, memory: '512MB' })
  .https.onCall(async (data, context) => {

    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Connexion requise.');
    }

    const coverUrl: string | undefined   = typeof data?.coverUrl      === 'string' ? data.coverUrl      : undefined;
    const itemId: string | undefined     = typeof data?.itemId        === 'string' ? data.itemId        : undefined;
    const categoryId: string | undefined = typeof data?.categoryId    === 'string' ? data.categoryId    : undefined;
    const garmentType: string            = typeof data?.garmentType   === 'string' ? data.garmentType   : 'dresses';
    const garmentDesc: string            = typeof data?.garmentDesc   === 'string' ? data.garmentDesc   : '';
    const modelImageUrl: string          = typeof data?.modelImageUrl === 'string' ? data.modelImageUrl
                                         : (process.env['TRYON_DEFAULT_MODEL_URL'] ?? DEFAULT_MODEL_URL);

    if (!coverUrl || !itemId || !categoryId) {
      throw new functions.https.HttpsError('invalid-argument', 'coverUrl, itemId et categoryId sont requis.');
    }

    const token = process.env['REPLICATE_API_TOKEN'];
    if (!token) {
      throw new functions.https.HttpsError('internal', 'REPLICATE_API_TOKEN non configuré.');
    }

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const idmCategory = toIdmCategory(garmentType);

    // ── 1. Lancer la prédiction ──────────────────────────────────────────────
    console.log(`[tryonVirtual] Démarrage — item=${itemId} category=${idmCategory}`);

    let startRes: Response;
    try {
      const reqUrl  = `${REPLICATE_API}/predictions`;
      const reqBody = {
        version: IDM_VERSION,
        input: {
          human_img:   modelImageUrl,
          garm_img:    coverUrl,
          garment_des: garmentDesc || 'robe',
          category:    idmCategory,
          crop:        true,
          force_dc:    idmCategory === 'dresses',
          steps:       40,
          seed:        42,
        },
      };
      console.log(`[tryonVirtual] POST ${reqUrl} version=${IDM_VERSION} category=${idmCategory}`);
      startRes = await fetch(reqUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(reqBody),
      });
    } catch (err: any) {
      throw new functions.https.HttpsError('unavailable', `Impossible de joindre Replicate : ${err?.message}`);
    }

    if (!startRes.ok) {
      const errText = await startRes.text();
      console.error(`[tryonVirtual] Replicate start ${startRes.status}`, errText);
      throw new functions.https.HttpsError('internal', `Replicate ${startRes.status} : ${errText.slice(0, 300)}`);
    }

    let prediction = await startRes.json() as any;
    console.log(`[tryonVirtual] Prediction id=${prediction.id} status=${prediction.status}`);

    // ── 2. Polling jusqu'à complétion ────────────────────────────────────────
    const MAX_WAIT_MS = 270_000; // 4.5 min
    const start = Date.now();

    while (!['succeeded', 'failed', 'canceled'].includes(prediction.status)) {
      if (Date.now() - start > MAX_WAIT_MS) {
        throw new functions.https.HttpsError('deadline-exceeded', 'Timeout : Replicate n\'a pas répondu dans les temps.');
      }
      await new Promise(r => setTimeout(r, 3000));

      const pollRes = await fetch(`${REPLICATE_API}/predictions/${prediction.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      prediction = await pollRes.json() as any;
      console.log(`[tryonVirtual] Polling status=${prediction.status}`);
    }

    if (prediction.status !== 'succeeded' || !prediction.output) {
      throw new functions.https.HttpsError('internal', `Génération échouée : ${prediction.error ?? 'unknown'}`);
    }

    // ── 3. Récupérer l'URL de sortie ─────────────────────────────────────────
    const outputUrl: string = Array.isArray(prediction.output)
      ? prediction.output[0]
      : prediction.output;

    // ── 4. Télécharger et uploader vers Firebase Storage ─────────────────────
    const imgRes = await fetch(outputUrl);
    if (!imgRes.ok) {
      throw new functions.https.HttpsError('internal', 'Impossible de télécharger l\'image générée.');
    }

    const buffer      = Buffer.from(await imgRes.arrayBuffer());
    const bucket      = admin.storage().bucket();
    const storagePath = `catalog/${categoryId}/${itemId}/tryon.jpg`;
    const file        = bucket.file(storagePath);

    await file.save(buffer, { contentType: 'image/jpeg', public: true });
    const tryonUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;

    // ── 5. Remplacer l'image dans le catalogue (coverUrl + images[0]) ─────────
    const db       = admin.database();
    const itemRef  = db.ref(`catalog/items/${itemId}`);

    // Met à jour coverUrl et images[0] en une seule transaction
    const imagesSnap = await itemRef.child('images').get();
    const images: string[] = imagesSnap.val() ?? [];
    if (images.length > 0) images[0] = tryonUrl;

    await itemRef.update({
      coverUrl: tryonUrl,
      tryonUrl: tryonUrl,
      ...(images.length > 0 ? { images } : {}),
    });

    console.log(`[tryonVirtual] Succès — ${tryonUrl}`);
    return { tryonUrl };
  });
