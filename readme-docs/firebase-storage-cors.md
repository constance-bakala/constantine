# CORS Firebase Storage (upload logo / favicon / carousel depuis l'admin)

L'admin utilise le SDK Web (`uploadBytes` sur `config/branding/…`). Le navigateur envoie des requêtes vers `firebasestorage.googleapis.com` : le **bucket GCS** du projet doit exposer une configuration **CORS** qui autorise votre origine Hosting et le dev local.

Le fichier **`cors.firebase-storage.json`** à la racine du template regroupe : **(1)** les origines du site + `localhost` et les méthodes `GET` … `DELETE` + en-têtes nécessaires aux **uploads** résumables Firebase ; **(2)** les origines **Pinterest** en `GET` (ex-rich pins), anciennement dans `cors.json` (fichier supprimé — tout est fusionné ici).

**Déploiement client (Cloud Build)** : après injection du `projectId` dans ce JSON, le pipeline tente `gsutil cors set` sur le bucket `storageBucket` (étape `storage-cors`). **En cas d’échec** (403, absence de facturation Blaze / pay-as-you-go, Storage ou bucket indisponible, IAM insuffisant), l’étape **log un avertissement** et **le build continue** : le site peut se déployer sans CORS appliquée ; corrigez la facturation / IAM puis ré-appliquez manuellement ou relancez un déploiement. Si tout est en ordre, le SA `deploy-{clientId}` doit avoir **`roles/storage.bucketAdmin`** (provisionnement automatique pour les nouveaux clients).

Sans cette étape, la console affiche souvent :

> Access to XMLHttpRequest at `https://firebasestorage.googleapis.com/...` … blocked by CORS policy … preflight … does not have HTTP ok status

## Étape 1 — Adapter le fichier `cors.firebase-storage.json`

À la racine du dépôt **template ecommerce** (`up2date-it/ecommerce`) ou du **dépôt client** forké depuis ce template, ouvrir **`cors.firebase-storage.json`**.

**Adapter le JSON** : remplacer **les trois occurrences** de `REPLACE_WITH_PROJECT_ID` par l'**ID projet Firebase** (la même valeur que `projectId` dans la config Web / `.firebaserc`).

> **Déploiement via la plateforme (Cloud Build)** : cette substitution est faite **automatiquement** dans le job (`inject-config`) ; l’étape **`storage-cors`** enchaîne avec `gsutil cors set`. Les étapes 1–3 ci-dessous restent utiles pour un **réglage manuel** (nouveau domaine, bucket différent, dépannage).

Exemple d'origines après remplacement pour le projet `mon-boutique` :

- `https://mon-boutique.web.app`
- `https://mon-boutique.firebaseapp.com`
- `http://localhost:4200`

Ajoutez d'autres entrées dans `"origin"` si vous utilisez un domaine personnalisé.

## Étape 2 — Nom du bucket

Dans la console Firebase → **Stockage** → l'URL ou les détails du bucket, ou dans le JSON web : champ **`storageBucket`**.

Deux formes courantes :

| `storageBucket` dans le JSON | Commande `gsutil` (exemple projet `mon-boutique`) |
|-------------------------------|---------------------------------------------------|
| `mon-boutique.appspot.com` | `gsutil cors set cors.firebase-storage.json gs://mon-boutique.appspot.com` |
| `mon-boutique.firebasestorage.app` | `gsutil cors set cors.firebase-storage.json gs://mon-boutique.firebasestorage.app` |

Si une commande échoue avec « bucket not found », essayez l'autre forme.

## Étape 3 — Appliquer la configuration sur le bucket

```bash
gcloud auth login
gcloud config set project MON_PROJECT_ID
gsutil cors set cors.firebase-storage.json gs://VOTRE_STORAGE_BUCKET
```

Vérifier :

```bash
gsutil cors get gs://VOTRE_STORAGE_BUCKET
```

Puis recharger l'admin (idéalement onglet privé) et réessayer l'upload.

## Étape 4 — Règles Storage

Les règles du template (`storage.rules`) autorisent déjà l'écriture sous `config/**` pour les utilisateurs authentifiés. CORS et règles sont **complémentaires** : les deux doivent être corrects.

## Référence

La **deuxième entrée** du tableau JSON (origines Pinterest, `GET` uniquement) couvre l’usage décrit historiquement dans `cors.json`. La **première entrée** couvre les **uploads** admin (`PUT`/`POST`, etc.).
