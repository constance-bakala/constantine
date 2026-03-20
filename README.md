# Delice éternel Gabon

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Build for production

npm run build:prod

## Deploy on firebase after connection to firebase
firebase login --interactive 
## Project Console: https://console.firebase.google.com/project/delice-eternel-gabon/overview
firebase deploy --except functions
## Hosting URL: https://delice-eternel-gabon.web.app
## deploy only functions
firebase deploy --only "functions:welcomeSendgridEmail,functions:genericSendgridEmail"


## Vérifier l'état de la base de donnée firebase
Aller sur : https://delice-eternel-gabon.firebaseio.com/.json

## Compte twilio: GQY151YRDH7DJKPE3ZS4QUF7 ou 7U98HY3MZ36CWDTZNQWD6TY5

## Vérification du dernier déploiement applicatif
https://console.firebase.google.com/project/delice-eternel-gabon/hosting

---

## Gestion des images produits

### Formats d'image par catégorie

| Catégorie   | Format  | Extension         |
|-------------|---------|-------------------|
| Masques     | WebP    | `.webp`           |
| Bijoux      | WebP    | `.webp`           |
| Robes       | JPEG    | `.jpeg`           |

> Les masques et bijoux ont été convertis en WebP en mars 2026 (−85 % de poids).
> Les robes restent en JPEG car leur qualité photographique le justifie.

### Structure des assets

Chaque objet physique est représenté par un **sous-répertoire** dans sa catégorie.
Le fichier principal affiché dans la liste s'appelle toujours `cover.<ext>`.
Les vues additionnelles du même objet sont placées dans le même répertoire.

```
src/assets/
  masks/
    mask-1/
      cover.webp         ← image affichée dans la liste portfolio
      mask-1-b.webp      ← vue additionnelle (galerie dans la fiche détail)
      mask-1-c.webp
    mask-2/
      cover.webp
  dresses/
    dress-1/
      cover.jpeg
      dress-1-b.jpeg
  jewellery/
    earing-1/
      cover.webp
```

### Ajouter un nouvel objet

#### Masques et bijoux (WebP)

1. Créer un sous-répertoire avec le prochain identifiant disponible :
   ```
   src/assets/masks/mask-63/
   ```
2. Y déposer les images sources (PNG ou JPEG) :
   - `cover.png` (obligatoire) et les vues additionnelles (`mask-63-b.png`, etc.)
3. **Convertir en WebP** (supprime les PNG originaux) :
   ```bash
   node scripts/convert-to-webp.js
   ```
   Le script convertit récursivement tous les PNG de `masks/` et `jewellery/`
   en WebP (qualité 85) et supprime les fichiers PNG d'origine.
4. **Générer les JPEG pour les emails** :
   ```bash
   node scripts/generate-email-jpegs.js
   ```
   Ce script crée un fichier `cover.jpeg` (280 px, qualité 80) à côté de chaque
   `cover.webp`. Ces JPEG sont utilisés exclusivement dans les emails de commande
   pour assurer la compatibilité avec les clients mail sans support WebP (Outlook…).
5. Regénérer le fichier de groupes :
   ```bash
   npm run generate-groups
   ```

#### Robes (JPEG)

1. Créer un sous-répertoire : `src/assets/dresses/dress-53/`
2. Y déposer directement les fichiers JPEG (`cover.jpeg`, `dress-53-b.jpeg`, etc.)
3. Regénérer le fichier de groupes :
   ```bash
   npm run generate-groups
   ```

### Regrouper des images qui représentent le même objet

1. Choisir l'identifiant du groupe (en général le plus petit numéro)
2. Déplacer les images supplémentaires dans le répertoire de ce groupe :
   - `cover.webp` (ou `.jpeg` pour les robes) → image principale
   - `mask-X-b.webp`, `mask-X-c.webp`... → vues additionnelles
3. Supprimer le sous-répertoire devenu vide
4. Regénérer :
   ```bash
   npm run generate-groups
   ```

### Scripts de traitement des images

#### `scripts/convert-to-webp.js` — Conversion PNG → WebP (site web)

Convertit tous les PNG de `masks/` et `jewellery/` en WebP (qualité 85)
et supprime les PNG d'origine.

```bash
node scripts/convert-to-webp.js
```

**Quand l'utiliser :** après avoir ajouté de nouvelles images PNG pour les masques ou bijoux.
Ne pas l'exécuter sur `dresses/` (les robes restent en JPEG).

#### `scripts/generate-email-jpegs.js` — Génération JPEG pour les emails

Crée un fichier `cover.jpeg` (280 px, qualité 80) à partir de chaque `cover.webp`
dans `masks/` et `jewellery/`. Ces fichiers sont utilisés **uniquement dans les emails**
de commande, car certains clients email (Outlook…) ne supportent pas le format WebP.

```bash
node scripts/generate-email-jpegs.js
```

**Quand l'utiliser :** après chaque exécution de `convert-to-webp.js`.

> **Règle** : site web = WebP (performance), emails = JPEG (compatibilité universelle).

**Prérequis :** `sharp` doit être installé (`npm install --legacy-peer-deps`).

### Fichier généré automatiquement

`src/app/shared/helpers/items-groups.const.ts` est **généré automatiquement**
par `generate-groups.js`. Ne pas l'éditer manuellement.

Le script scanne les sous-répertoires de chaque catégorie et produit les
constantes `MASK_GROUPS`, `DRESS_GROUPS` et `EARING_GROUPS` utilisées par
le service Angular pour construire la liste des produits.

### Migration initiale depuis la structure plate

Si les images sont encore au format plat (`mask-1.png`, `dress-2.png`…),
exécuter le script de migration **une seule fois** depuis la racine du projet (PowerShell) :

```powershell
.\reorganize-assets.ps1
```

Puis convertir en WebP, générer les JPEG pour les emails, et regénérer les groupes :

```bash
node scripts/convert-to-webp.js
node scripts/generate-email-jpegs.js
npm run generate-groups
```
