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

### Structure des assets

Chaque objet physique est représenté par un **sous-répertoire** dans sa catégorie.
Le fichier principal affiché dans la liste s'appelle toujours `cover.png`.
Les vues additionnelles du même objet sont placées dans le même répertoire.

```
src/assets/
  masks/
    mask-1/
      cover.png          ← image affichée dans la liste portfolio
      mask-1-b.png       ← vue additionnelle (galerie dans la fiche détail)
      mask-1-c.png
    mask-2/
      cover.png
  dresses/
    dress-1/
      cover.png
      dress-1-b.png
  jewellery/
    earing-1/
      cover.png
```

### Ajouter un nouvel objet

1. Créer un sous-répertoire avec le prochain identifiant disponible :
   ```
   src/assets/masks/mask-63/
   ```
2. Y déposer `cover.png` (obligatoire) et les vues additionnelles (`mask-63-b.png`, etc.)
3. Regénérer le fichier de groupes :
   ```bash
   npm run generate-groups
   ```

### Regrouper des images qui représentent le même objet

1. Choisir l'identifiant du groupe (en général le plus petit numéro)
2. Déplacer les images supplémentaires dans le répertoire de ce groupe :
   - `cover.png` → image principale
   - `mask-X-b.png`, `mask-X-c.png`... → vues additionnelles
3. Supprimer le sous-répertoire devenu vide
4. Regénérer :
   ```bash
   npm run generate-groups
   ```

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

Puis regénérer les groupes :

```bash
npm run generate-groups
```
