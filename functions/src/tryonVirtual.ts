import * as functions from 'firebase-functions/v1';

// ---------------------------------------------------------------------------
// tryonVirtual — callable Firebase Function (test IA / virtual try-on)
//
// Espace cible : Nymbo/Virtual-Try-On (IDM-VTON, public, gratuit)
//   https://nymbo-virtual-try-on.hf.space
//
// Payload attendu :
//   garment  : string  — image vêtement en base64 (sans préfixe data:)
//   person   : string  — image mannequin/personne en base64
//   clothType: string  — 'upper_body' | 'lower_body' | 'dresses' (défaut: 'dresses')
//
// Variables d'environnement :
//   HF_TOKEN         : token Hugging Face
//   HF_TRYON_SPACE   : URL de l'espace (défaut: Nymbo/Virtual-Try-On)
// ---------------------------------------------------------------------------

/** Tente d'extraire un base64 depuis une data URL ou une URL distante. */
function extractBase64(output: any): string {
  if (typeof output === 'string') {
    return output.replace(/^data:image\/\w+;base64,/, '');
  }
  // Objet Gradio : { url, path, orig_name, ... }
  const dataField: string = output?.url ?? output?.data ?? output?.path ?? '';
  return dataField.replace(/^data:image\/\w+;base64,/, '');
}

export const tryonVirtual = functions
  .runWith({ timeoutSeconds: 300, memory: '512MB' })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Connexion requise.');
    }

    const garmentB64: string | undefined = typeof data?.garment === 'string' ? data.garment : undefined;
    const personB64: string | undefined  = typeof data?.person   === 'string' ? data.person   : undefined;
    const garmentDesc: string = typeof data?.garmentDesc === 'string' ? data.garmentDesc : 'a dress';

    if (!garmentB64 || !personB64) {
      throw new functions.https.HttpsError('invalid-argument', 'garment et person sont requis.');
    }

    const hfToken  = process.env['HF_TOKEN'];
    const spaceUrl = (process.env['HF_TRYON_SPACE'] ?? 'https://nymbo-virtual-try-on.hf.space').replace(/\/$/, '');

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (hfToken) headers['Authorization'] = `Bearer ${hfToken}`;

    // Format API Gradio pour Nymbo/Virtual-Try-On (IDM-VTON) :
    //   0 : dict ImageEditor { background: dataUrl, layers: [], composite: null }
    //   1 : garm_img  (dataUrl)
    //   2 : garment_des (string)
    //   3 : is_checked  (bool)
    //   4 : is_checked_crop (bool)
    //   5 : denoise_steps (int)
    //   6 : seed (int)
    const personDataUrl  = `data:image/jpeg;base64,${personB64}`;
    const garmentDataUrl = `data:image/jpeg;base64,${garmentB64}`;

    const payload = {
      data: [
        { background: personDataUrl, layers: [], composite: null },
        garmentDataUrl,
        garmentDesc,
        true,   // is_checked (auto-mask)
        true,   // is_checked_crop
        30,     // denoise_steps
        42,     // seed
      ],
    };

    console.log(`[tryonVirtual] Appel ${spaceUrl}/run/predict`);

    let response: Response;
    try {
      response = await fetch(`${spaceUrl}/run/predict`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
    } catch (fetchErr: any) {
      console.error('[tryonVirtual] fetch error', fetchErr);
      throw new functions.https.HttpsError('unavailable', `Impossible de joindre l'espace HF : ${fetchErr?.message}`);
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[tryonVirtual] HF API ${response.status}`, errText);

      if (response.status === 503) {
        throw new functions.https.HttpsError('unavailable',
          'L\'espace Hugging Face est actuellement en veille ou indisponible. Réessayez dans 1–2 minutes (le démarrage à froid prend du temps).');
      }
      throw new functions.https.HttpsError('internal', `HF API ${response.status} : ${errText.slice(0, 300)}`);
    }

    const json = await response.json() as any;
    const outputData = json?.data?.[0];

    if (!outputData) {
      throw new functions.https.HttpsError('internal', 'Aucun résultat retourné par l\'API HF.');
    }

    const resultB64 = extractBase64(outputData);

    if (!resultB64) {
      console.error('[tryonVirtual] outputData inattendu', JSON.stringify(outputData).slice(0, 200));
      throw new functions.https.HttpsError('internal', 'Format de réponse HF inattendu.');
    }

    console.log(`[tryonVirtual] Succès — ${resultB64.length} chars base64`);
    return { result: resultB64 };
  });
