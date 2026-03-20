# Guide de déploiement — Délice Éternel

## Prérequis

- Node.js 20
- Firebase CLI installé localement dans `functions/` (`npx firebase` pour utiliser la version locale)
- Être connecté à Firebase : `npx firebase login`

---

## 1. Déployer l'application Angular

### Deux cibles de déploiement

| Cible | URL | `--base-href` |
|---|---|---|
| Firebase Hosting | https://delice-eternel-gabon.web.app | `/` |
| GitHub Pages | https://constance-bakala.github.io/constantine | `./` ou `/constantine/` |

Les deux utilisent le même dossier `docs/` comme output, mais avec un `--base-href` différent.
**Ne pas mélanger les deux builds** : un build Firebase déployé sur GitHub Pages cassera les assets, et vice versa.

---

### Build + déploiement Firebase Hosting

```bash
# Build pour Firebase (base-href = /)
# MSYS_NO_PATHCONV=1 est obligatoire sous Git Bash sur Windows :
# sans lui, Git Bash convertit "/" en "C:/Program Files/Git/" et casse les assets.
MSYS_NO_PATHCONV=1 ng build --configuration production --output-path docs --base-href /

# Déployer
npx firebase deploy --only hosting
```

Ou en une commande si `package.json` est à jour :

```bash
npm run build:firebase
npx firebase deploy --only hosting
```

L'app est accessible sur : https://delice-eternel-gabon.web.app

---

### Build + déploiement GitHub Pages

```bash
# Build pour GitHub Pages (base-href = ./ pour servir depuis un sous-répertoire)
ng build --configuration production --output-path docs --base-href ./

# Pousser le dossier docs/ sur GitHub
git add docs/
git commit -m "deploy: update GitHub Pages"
git push
```

GitHub Pages sert automatiquement le contenu du dossier `docs/` de la branche `master`.
L'app est accessible sur : https://constance-bakala.github.io/constantine

---

## 2. Déployer les fonctions Firebase

Les fonctions sont dans `functions/`. Elles sont compilées en TypeScript avant le déploiement.

### Build seul (sans déploiement)

```bash
# Depuis le dossier functions/
cd functions
npm run build        # compile TypeScript → lib/
```

Ou depuis la racine :

```bash
npm --prefix functions run build
```

Le build génère les fichiers JS dans `functions/lib/`. C'est ce dossier qui est déployé sur Firebase (défini par `"main": "lib/index.js"` dans `functions/package.json`).

### Déploiement

```bash
# Depuis la racine du projet
npx firebase deploy --only functions
```

Le prédéploiement (défini dans `firebase.json`) exécute automatiquement :
1. `npm run lint` — vérification ESLint
2. `npm run build` — compilation TypeScript (`tsc`)

### En cas d'erreur "User code failed to load / Timeout"

Ce timeout est intermittent avec firebase-functions v7. Relancer simplement la commande :

```bash
npx firebase deploy --only functions
```

### Variables d'environnement des fonctions

Les variables sont dans `functions/.env` (non versionné) :

```
BREVO_API_KEY=xkeysib-...
BREVO_FROM_EMAIL=delice.eternel.gabon@gmail.com
BREVO_FROM_NAME=Délice Éternel
BREVO_TEMPLATE_ORDER=1
BREVO_TEMPLATE_WELCOME=2
```

---

## 3. Déployer hosting + functions ensemble

```bash
# Build Angular d'abord, puis tout déployer
npm run build:prod
npx firebase deploy
```

---

## 4. Vérifier les logs Firebase Functions

### Via CLI

```bash
# Afficher les derniers logs
npx firebase functions:log

# Suivre les logs en temps réel
npx firebase functions:log --follow

# Filtrer par nom de fonction
npx firebase functions:log --only genericBrevoEmail
npx firebase functions:log --only welcomeBrevoEmail
```

### Via la Console Firebase

1. Aller sur https://console.firebase.google.com/project/delice-eternel-gabon/functions
2. Cliquer sur la fonction (`genericBrevoEmail` ou `welcomeBrevoEmail`)
3. Onglet **Logs** — affiche les `console.log` et `console.error`

Les logs utiles à surveiller :
```
[Brevo] genericBrevoEmail → { to, subject, itemsCount, totalTTC }   ← email envoyé
[Brevo] genericBrevoEmail ERROR ...                                  ← erreur d'envoi
[Brevo] welcomeBrevoEmail OK → email@example.com                    ← bienvenue envoyé
```

---

## 5. Vérifier les logs Brevo

1. Se connecter sur https://app.brevo.com
2. Menu **Transactionnel** → **Logs**
3. Filtrer par date ou par adresse email destinataire
4. Cliquer sur un email pour voir :
   - Le statut (Délivré, Erreur, Bounce)
   - Le détail de l'erreur si applicable (ex : erreur de syntaxe dans le template)

---

## 6. Mettre à jour les templates Brevo

Les templates HTML source sont versionés dans `functions/src/templates/` :

| Fichier | Template Brevo | Usage |
|---|---|---|
| `commande_envoyee.brevo.template.html` | Template #1 | Email envoyé au client après une commande |
| `mail_bienvenu.brevo.template.html` | Template #2 | Email envoyé à l'inscription |

### Procédure de mise à jour

1. Modifier le fichier HTML source dans `functions/src/templates/`
2. Se connecter sur https://app.brevo.com
3. Menu **Transactionnel** → **Templates**
4. Cliquer sur le template à modifier (ex: "commande_envoyee" #1)
5. Cliquer sur **Modifier**
6. Passer en mode **Éditeur HTML** (icône `<>`)
7. Sélectionner tout (`Ctrl+A`) et remplacer par le contenu du fichier source
8. Cliquer sur **Enregistrer & Quitter**

### Affichage des images articles dans le template commande (#1)

Les images des articles sont des chemins relatifs dans l'app Angular (ex: `assets/masks/MASK-1/cover.png`).
Avant l'envoi, le code Angular (`cart-items.component.ts`) les convertit en URLs absolues :

```typescript
item.path = prefix + '/' + item.path;
// résultat : https://delice-eternel-gabon.web.app/assets/masks/MASK-1/cover.png
```

**Important :** les images ne s'affichent que si l'app Angular est déployée en production.
En local (`http://localhost:4200`), les URLs générées ne sont pas accessibles depuis les serveurs
de Brevo, donc les images apparaissent vides dans l'email reçu.

Pour tester les emails avec les images, toujours envoyer une commande depuis
**https://delice-eternel-gabon.web.app** et non depuis localhost.

Dans le template Brevo, l'image est affichée via :
```html
<img src="{{ item.path }}" width="280" ... />
```

### Syntaxe Brevo (Jinja2)

```html
<!-- Variable simple -->
{{ params.displayName }}

<!-- Boucle sur les articles -->
{% for item in params.items %}
  {{ item.reference }}
  {{ item.price }} €
{% endfor %}

<!-- Variables disponibles pour le template commande (#1) -->
{{ params.displayName }}         — nom du client
{{ params.items }}               — liste des articles
{{ params.totalHT }}             — total hors taxe
{{ params.tva }}                 — TVA (10%)
{{ params.totalTTC }}            — total TTC

<!-- Variables disponibles pour le template bienvenue (#2) -->
{{ params.displayName }}
{{ params.dressesLink }}
{{ params.masksLink }}
{{ params.earingsLink }}
```

---

## 7. Référencement Google (SEO)

### Ce qui est en place

| Élément | Fichier | Description |
|---|---|---|
| Meta tags | `src/index.html` | title, description, og:*, keywords |
| JSON-LD Schema.org | `src/index.html` | ClothingStore + Person |
| SEO par route | `src/app/shared/services/seo.service.ts` | title/description mis à jour à chaque navigation |
| Sitemap | `src/sitemap.xml` | Liste des 4 URLs principales |
| robots.txt | `src/robots.txt` | Autorise tout + pointe vers sitemap |
| Vérification Google | `src/index.html` | Balise `<meta name="google-site-verification">` |

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
