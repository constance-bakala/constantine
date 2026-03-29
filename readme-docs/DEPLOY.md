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

> Pour tout ce qui concerne les emails transactionnels Brevo, voir [EMAILS.md](EMAILS.md).


> Pour tout ce qui concerne le référencement Google et Pinterest, voir [SEO.md](SEO.md).