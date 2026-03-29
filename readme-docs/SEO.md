# Référencement — Délice Éternel

Ce document couvre l'ensemble du référencement naturel (Google) et social (Pinterest) mis en place sur le site.

---

## 1. Référencement Google (SEO)

### Ce qui est en place

| Élément | Fichier | Description |
|---|---|---|
| Meta tags | `src/index.html` | title, description, og:*, keywords |
| JSON-LD Schema.org | `src/index.html` | ClothingStore + Person |
| SEO par route | `src/app/shared/services/seo.service.ts` | title/description mis à jour à chaque navigation |
| Sitemap | `src/sitemap.xml` | Liste des 4 URLs principales |
| robots.txt | `src/robots.txt` | Autorise tout + pointe vers sitemap |
| Vérification Google | `src/index.html` | Balise `<meta name="google-site-verification">` |

### Mots-clés ciblés

Les mots-clés principaux intégrés dans `src/index.html` :

```
Constantine Gabon, Constantines Gabon, Constantine couturière,
Constantine Libreville, mode africaine Gabon, couturière Libreville,
coiffeuse Libreville, robes africaines Gabon, masques Gabon
```

### Mettre à jour le sitemap

Le sitemap est dans `src/sitemap.xml`. Mettre à jour la date `<lastmod>` à chaque déploiement majeur :

```xml
<lastmod>2026-03-19</lastmod>
```

Puis rebuilder et redéployer (les fichiers `src/sitemap.xml` et `src/robots.txt` sont copiés dans `docs/` via `angular.json` assets).

### Soumettre / re-soumettre le sitemap à Google

1. Aller sur https://search.google.com/search-console
2. Sélectionner la propriété `https://delice-eternel-gabon.web.app`
3. Menu gauche → **Indexation** → **Sitemaps**
4. Dans le champ "Add a new sitemap", taper `sitemap.xml` → cliquer **Submit**
5. Le statut doit passer à **Success** (0 discovered pages = erreur de fetch)

> **Note :** si le statut indique "Couldn't fetch", vérifier que `firebase.json` contient bien le header
> `Content-Type: application/xml` pour `sitemap.xml` (voir section firebase.json ci-dessous).

### Demander l'indexation des pages principales

À faire après chaque déploiement majeur (nouvelles pages, nouveau contenu) :

1. Dans Search Console, coller chaque URL dans la barre de recherche en haut :
   - `https://delice-eternel-gabon.web.app/`
   - `https://delice-eternel-gabon.web.app/dresses`
   - `https://delice-eternel-gabon.web.app/masks`
   - `https://delice-eternel-gabon.web.app/earings`
2. Pour chaque URL, cliquer sur **"Request indexing"**

### Délais attendus

- Première indexation après soumission du sitemap : **1 à 4 semaines**
- Activité visible dans l'onglet "Performance" : après les premières impressions/clics
- Partager des liens vers le site (Facebook, Instagram, WhatsApp) accélère la découverte par Google

### firebase.json — headers pour les fichiers statiques SEO

Le rewrite `**` de Firebase intercepterait `sitemap.xml` et `robots.txt` sans ces headers explicites :

```json
"headers": [
  {
    "source": "sitemap.xml",
    "headers": [{ "key": "Content-Type", "value": "application/xml" }]
  },
  {
    "source": "robots.txt",
    "headers": [{ "key": "Content-Type", "value": "text/plain" }]
  }
]
```

---

## 2. Référencement Pinterest

Pinterest est un levier SEO important : ses pages apparaissent fréquemment en première position sur Google pour les recherches de vêtements. Les épingles créées ici font remonter le site dans les résultats Google via Pinterest.

### Architecture mise en place

```
Admin Catalog → bouton "CSV Pinterest"
     ↓
Export CSV (format Pinterest Business bulk import)
     ↓
Import sur Pinterest Business → épingles créées
     ↓
Épingles indexées par Google → trafic vers le site
```

### 2.1 Prérequis : Firebase Storage public via GCS

Pinterest (côté serveur) doit pouvoir télécharger les images. Les URLs Firebase Storage classiques (avec token) ne sont pas utilisables car elles ne se terminent pas par `.jpg`/`.jpeg`/`.png`.

**Solution :** rendre le bucket Firebase publiquement accessible via Google Cloud Storage.

#### Commande à exécuter (une seule fois)

```bash
gsutil iam ch allUsers:objectViewer gs://delice-eternel-gabon.appspot.com
```

Cela permet d'accéder aux images via des URLs GCS propres :

```
https://storage.googleapis.com/delice-eternel-gabon.appspot.com/catalog/dress/ID/cover.jpeg
```

Ces URLs se terminent par l'extension du fichier et sont accessibles sans token.

#### CORS Firebase Storage (pour accès cross-origin)

Le fichier `cors.json` à la racine du projet configure les headers CORS :

```json
[{
  "origin": ["https://*.pinterest.com", "https://pinterest.com"],
  "method": ["GET"],
  "responseHeader": ["Content-Type"],
  "maxAgeSeconds": 3600
}]
```

Pour appliquer :

```bash
gsutil cors set cors.json gs://delice-eternel-gabon.appspot.com
```

### 2.2 Export CSV depuis l'admin

Dans l'interface admin (`/admin`), sélectionner une catégorie puis cliquer sur **"CSV Pinterest"** dans l'en-tête de la catégorie.

Le fichier téléchargé contient une ligne par article ayant une image de couverture (`coverUrl`).

#### Format du CSV généré

| Colonne | Valeur |
|---|---|
| `Title` | `DRESS-1 – Robes constantines Gabon` |
| `Media URL` | URL GCS publique se terminant par `.jpeg` |
| `Pinterest board` | `Délice Éternel Constantine – Robes constantines` |
| `Thumbnail` | vide (images uniquement, pas de vidéos) |
| `Description` | `DRESS-1 – Constantine, couturière mode africaine Libreville Gabon. Délice Éternel.` |
| `Link` | `https://delice-eternel-gabon.web.app/#DRESS-1` (unique par item) |
| `Publish date` | vide (publication immédiate) |
| `Keywords` | `mode africaine Gabon, Constantine Libreville, couturière Gabon, vêtements africains` |

> **Important :** le `Link` est unique par item (ancre `#REFERENCE`) pour éviter que Pinterest
> considère toutes les épingles comme des doublons et n'en publie qu'une seule.

> **Important :** les noms de colonnes doivent être en **anglais** (`Media URL`, `Thumbnail`, `Keywords`)
> même si l'interface Pinterest est en français. La version française de la documentation Pinterest
> montre des noms traduits, mais le système attend les noms anglais.

#### Limites Pinterest

- Maximum **200 épingles** par import CSV
- Maximum **100 caractères** pour le titre
- Maximum **500 caractères** pour la description

### 2.3 Import sur Pinterest Business

1. Se connecter sur [pinterest.com](https://pinterest.com) avec le compte Business
2. Cliquer sur **Créer** → **Créer plusieurs épingles**
3. Uploader le fichier CSV généré
4. Pinterest affiche un aperçu des épingles
5. Cliquer sur **Publier**

#### En cas d'erreur

Pinterest génère un rapport CSV téléchargeable avec une colonne `error` indiquant la raison par épingle :

| Erreur | Cause probable |
|---|---|
| `URL de média manquante` | URL inaccessible, mauvaise extension, ou bucket non public |
| `Format du fichier non valide` | Mauvais séparateur (utiliser `,` et non `;`) |
| Doublon | Même `Link` sur plusieurs épingles — vérifier que les ancres `#REFERENCE` sont bien présentes |

### 2.4 Tableaux Pinterest à créer

Créer les tableaux correspondant aux catégories du catalogue avant ou lors du premier import :

| Tableau Pinterest | Catégorie |
|---|---|
| `Délice Éternel Constantine – Robes constantines` | Robes |
| `Délice Éternel Constantine – Masques` | Masques |
| `Délice Éternel Constantine – Boucles d'oreilles` | Boucles d'oreilles |

> Les tableaux sont créés automatiquement si le nom dans le CSV n'existe pas encore sur Pinterest.

### 2.5 Code source

| Fichier | Rôle |
|---|---|
| `src/app/features/admin/admin-catalog/admin-catalog.component.ts` | Méthode `exportPinterestCsv()` — génère et télécharge le CSV |
| `src/app/features/admin/admin-catalog/admin-catalog.component.html` | Bouton "CSV Pinterest" dans l'en-tête de catégorie |
| `src/app/features/admin/admin-catalog/admin-catalog.component.scss` | Style du bouton `.btn-pinterest-csv` |
| `cors.json` | Configuration CORS Firebase Storage |
