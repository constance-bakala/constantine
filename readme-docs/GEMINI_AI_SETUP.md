# Guide d'installation — Firebase AI Logic (Gemini 2.5) sur Angular

> **Projet** : Délice Éternel Gabon
> **Date** : Mars 2026
> **Stack** : Angular 21 · Firebase 12 · rxfire 6 · @ngx-translate/core 17
> **Modèle IA** : `gemini-2.5-flash-lite` (via Firebase AI Logic)

---

## Vue d'ensemble

Ce guide documente **tout le parcours** nécessaire pour faire fonctionner Gemini 2.5 dans une application Angular hébergée sur Firebase Hosting. Il couvre les erreurs rencontrées, les URL à visiter manuellement dans les consoles Google, et les corrections de code TypeScript.

L'intégration comprend trois fonctionnalités :
1. **Génération automatique de descriptions** d'articles (image → texte, multimodal)
2. **Chatbot conversationnel** multi-tour avec changement de langue dynamique
3. **Interface admin complète** : génération unitaire, édition inline, génération en masse, effacement

---

## Partie 1 — Prérequis Firebase

### 1.1 Passer au plan Blaze (Pay as you go)

Firebase AI Logic **nécessite obligatoirement le plan Blaze**. Le plan Spark (gratuit) ne permet pas d'utiliser les modèles Gemini.

**URL** : https://console.firebase.google.com/project/TON_PROJECT_ID/usage/details

1. Aller dans **Utilisation et facturation** dans le menu gauche de la console Firebase
2. Cliquer sur **Passer au plan Blaze**
3. Renseigner un moyen de paiement (carte bancaire)
4. Définir un budget d'alerte (recommandé : 5–10 $) pour éviter les surprises

> Le plan Blaze inclut un niveau gratuit généreux. Pour un usage modéré (chatbot + descriptions), la facturation reste nulle ou très faible.

### 1.2 Activer Firebase AI Logic dans la console Firebase

**URL** : https://console.firebase.google.com/project/TON_PROJECT_ID/ai

1. Dans le menu gauche de Firebase Console, chercher **Firebase AI Logic** (ou "AI")
2. Cliquer sur **Get started** / **Commencer**
3. Choisir le backend **Gemini API** (Google AI) — pas Vertex AI
4. Firebase affiche une page de confirmation "View SDK instructions"
5. Valider — Firebase enregistre l'application pour utiliser le service

---

## Partie 2 — Activation des APIs Google Cloud

C'est l'étape **la plus critique** et la moins documentée. Même avec Firebase configuré, les appels échouent avec une erreur **403 API_KEY_SERVICE_BLOCKED** si les APIs ne sont pas activées manuellement dans Google Cloud Console.

### 2.1 Activer l'API Firebase AI Logic

> **Contexte** : L'application utilise le backend **Google AI (Gemini API)**, pas Vertex AI.
> Malgré cela, l'API à activer s'appelle `firebasevertexai.googleapis.com` — c'est le nom interne
> de Firebase AI Logic dans Google Cloud, quelle que soit l'option de backend choisie.
> Ne pas chercher "Vertex AI" : cette API n'est pas utilisée et ne doit pas être activée.

#### Option A — URL directe (recommandée)

Ouvrir directement ce lien dans le navigateur (remplacer `delice-eternel-gabon` par le project ID si nécessaire) :

```
https://console.cloud.google.com/apis/enableflow?apiid=firebasevertexai.googleapis.com&project=delice-eternel-gabon
```

1. La page affiche **"Firebase AI Logic API"** avec un bouton **Enable** / **Activer**
2. Cliquer **Enable**
3. Attendre 10–20 secondes que la page confirme : **"API enabled"** (bandeau vert en haut)
4. Le statut passe de `DISABLED` à `ENABLED` dans le tableau de bord de l'API

#### Option B — Via la bibliothèque d'APIs GCP (manuel)

1. Aller sur https://console.cloud.google.com
2. Vérifier que le bon projet est sélectionné : menu déroulant **en haut à gauche**, à côté du logo Google Cloud — le nom du projet doit être `delice-eternel-gabon`
3. Cliquer sur l'icône **≡ Menu** (hamburger) en haut à gauche
4. Aller dans **APIs & Services** → **Library** (Bibliothèque)
5. Dans la barre de recherche, taper : `Firebase AI Logic`
6. Cliquer sur la carte **"Firebase AI Logic API"** (éditeur : Firebase)
   - ⚠️ Ne pas confondre avec "Vertex AI API" — ce n'est pas la même chose
7. Cliquer **Enable** / **Activer**
8. Attendre la confirmation : la page se recharge et affiche le tableau de bord de l'API avec le statut **"API enabled"**

#### Vérifier que l'API est bien activée

1. Aller dans **APIs & Services** → **Enabled APIs & services**
2. Chercher `Firebase AI Logic` dans la liste
3. Elle doit apparaître avec le statut actif (pas de bandeau "disabled")

### 2.2 Ajouter l'API à la restriction de la clé API du navigateur

C'est l'étape **la plus piégeuse**. Firebase crée automatiquement une **Browser key** (clé API navigateur) dont l'accès est restreint à une liste d'APIs autorisées. Firebase AI Logic n'est **pas dans cette liste par défaut**.

**URL** : https://console.cloud.google.com/apis/credentials

1. Aller dans **APIs & Services** → **Credentials** (Identifiants)
2. Dans la section "API keys", cliquer sur la clé nommée **Browser key (auto created by Firebase)**
3. Dans la section **"API restrictions"**, vérifier que "Restrict key" est coché
4. La liste des APIs autorisées s'affiche (généralement ~49 APIs)
5. Cliquer **Edit** puis chercher **Firebase AI Logic API** dans le menu déroulant
6. Cocher la case pour l'ajouter à la liste (elle passe de 49 à 50 APIs)
7. Cliquer **Save**

> **Délai de propagation** : Les changements de restrictions de clé API peuvent prendre **2 à 5 minutes** pour se propager. Ne pas paniquer si la première requête échoue juste après la sauvegarde.

### 2.3 Configurer les CORS sur Firebase Storage

La génération de description télécharge l'image via `fetch()` côté navigateur. Sans configuration CORS sur le bucket Firebase Storage, la requête est bloquée avec l'erreur :

```
Access to fetch at 'https://firebasestorage.googleapis.com/...' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Solution** : configurer les CORS via Google Cloud Console (aucun outil à installer).

**Option A — Via la console GCP (interface graphique) :**

1. Aller sur https://console.cloud.google.com/storage/browser
2. Cliquer sur le bucket `TON_PROJECT_ID.appspot.com`
3. Onglet **"Configuration"** → section **"Cross-origin resource sharing (CORS)"** → **"Modifier"**
4. Remplir :
   - **List of allowed origins** : `https://TON_APP.web.app, https://TON_APP.firebaseapp.com, http://localhost:4200`
   - **Specify methods** : cocher uniquement **Get**
   - **List of allowed response headers** : `Content-Type, Authorization`
   - **Cache expiry time** : `3600`
5. Cliquer **Done** → **Save**

**Option B — Via Google Cloud Shell (terminal dans le navigateur) :**

1. Cliquer l'icône **Cloud Shell** (`>_`) en haut à droite de la console GCP
2. Dans le terminal :

```bash
cat > cors.json << 'EOF'
[{
  "origin": ["https://TON_APP.web.app","https://TON_APP.firebaseapp.com","http://localhost:4200"],
  "method": ["GET"],
  "responseHeader": ["Content-Type","Authorization"],
  "maxAgeSeconds": 3600
}]
EOF
gsutil cors set cors.json gs://TON_PROJECT_ID.appspot.com
```

> **Important** : `gsutil` est préinstallé dans Cloud Shell. Pas besoin de l'installer localement.

---

## Partie 3 — Installation du SDK dans l'application Angular

### 3.1 Mise à jour de Firebase

Firebase AI Logic (`firebase/ai`) n'est disponible qu'à partir de **Firebase 12.x**.

```bash
npm install firebase@12.11.0
```

> **Problème connu** : `rxfire` (6.1.0) déclare une compatibilité peer uniquement avec `firebase ^9 || ^10 || ^11`. Avec Firebase 12, TypeScript génère des erreurs de type dans les `.d.ts` de rxfire.

### 3.2 Contourner les erreurs de type rxfire avec Firebase 12

Deux modifications dans `tsconfig.json` sont nécessaires :

**Ajout de `skipLibCheck: true`** (ignore les erreurs dans les `.d.ts` des dépendances) :

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    ...
  }
}
```

**Ajout des `paths` pour résoudre les imports firebase** (nécessaire avec `moduleResolution: "bundler"`) :

```json
{
  "compilerOptions": {
    "paths": {
      "firebase/compat/app":      ["./node_modules/firebase/compat/app"],
      "firebase/compat/auth":     ["./node_modules/firebase/compat/auth"],
      "firebase/compat/database": ["./node_modules/firebase/compat/database"],
      "firebase/compat/storage":  ["./node_modules/firebase/compat/storage"],
      "firebase/auth":            ["./node_modules/firebase/auth"],
      "firebase/database":        ["./node_modules/firebase/database"],
      "firebase/storage":         ["./node_modules/firebase/storage"],
      "firebase/functions":       ["./node_modules/firebase/functions"],
      "firebase/app":             ["./node_modules/firebase/app"]
    }
  }
}
```

> **Important** : Ne pas changer `moduleResolution` de `"bundler"` vers `"node"` — cela casse les imports d'Angular Material (qui utilise les `exports` du `package.json` pour les sous-chemins comme `@angular/material/toolbar`).

### 3.3 Déclarer firebase.d.ts dans tsconfig.app.json

Dans `src/tsconfig.app.json`, ajouter `firebase.d.ts` à la liste des fichiers :

```json
{
  "files": [
    "main.ts",
    "polyfills.ts",
    "firebase.d.ts"
  ]
}
```

---

## Partie 4 — Code du service GeminiAiService

Fichier : `src/app/core/firebase/gemini-ai.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { TranslateService } from '@ngx-translate/core';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GeneratedDescription {
  fr: string;
  en: string;
}

@Injectable({ providedIn: 'root' })
export class GeminiAiService {

  private readonly ai = getAI(this.app, { backend: new GoogleAIBackend() });

  constructor(
    private app: FirebaseApp,
    private translate: TranslateService,
  ) {}

  get currentLang(): 'fr' | 'en' {
    // Utiliser getCurrentLang() — currentLang est déprécié dans @ngx-translate v17
    return (this.translate.getCurrentLang() ?? 'fr') as 'fr' | 'en';
  }

  // ── Génération de description (multimodal image → texte) ──────────────────

  async generateItemDescription(
    imageUrl: string,
    categoryTitle: string,
  ): Promise<GeneratedDescription> {
    const model = getGenerativeModel(this.ai, { model: 'gemini-2.5-flash-lite' });

    const base64 = await this.urlToBase64(imageUrl);
    const mimeType = this.detectMimeType(imageUrl);

    // Prompt structuré en deux étapes : analyse visuelle d'abord, rédaction ensuite.
    // Cela force Gemini à observer les détails spécifiques (couleur, manches, longueur…)
    // plutôt que de produire une description générique.
    const prompt = `Tu es un copywriter expert pour "Délice Éternel", boutique de mode africaine à Libreville (Gabon).

Commence par analyser attentivement l'image et note les caractéristiques visuelles précises :
- Couleurs dominantes et motifs (wax, tissu uni, imprimé, rayures…)
- Longueur des manches (sans manches, manches courtes, manches ¾, longues manches)
- Longueur du vêtement (court, mi-long, maxi)
- Coupe et silhouette (ajustée, fluide, évasée, droite, portefeuille…)
- Détails distinctifs visibles (col, décolleté, ceinture, broderie, volants, fentes…)

Ensuite, rédige une description commerciale de 2-3 phrases qui mentionne UNIQUEMENT les détails que tu observes réellement dans cette image. Chaque description doit être unique et spécifique à cet article — évite les formulations génériques.

Catégorie : "${categoryTitle}". Ton : chaleureux, élégant, commercial.

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans backticks :
{"fr":"description spécifique en français","en":"specific description in English"}`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64, mimeType } },
    ]);

    const rawText = result.response.text().trim();
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Réponse Gemini invalide : ' + rawText);
    return JSON.parse(jsonMatch[0]) as GeneratedDescription;
  }

  // ── Chatbot multi-tour ────────────────────────────────────────────────────

  async sendChatMessage(userMessage: string, history: ChatMessage[]): Promise<string> {
    const lang = this.currentLang;

    const systemInstruction = lang === 'fr'
      ? `Tu es l'assistant de Délice Éternel, une boutique de mode africaine à Libreville (Gabon).
Tu réponds en français, de façon chaleureuse et concise (3 phrases max).
Tu aides les clients sur : les produits (vêtements, bijoux, masques), les tailles, les paiements (Airtel Money, Moov Money, Remitly, Western Union), la livraison (coursier Libreville 2 000–5 000 FCFA, expédition internationale DHL/FedEx) et les codes promo.
Si tu ne sais pas, dis-le honnêtement et invite le client à nous contacter par email.`
      : `You are the assistant for Délice Éternel, an African fashion boutique in Libreville (Gabon).
You respond in English, warmly and concisely (3 sentences max).
You help customers with: products (clothing, jewellery, masks), sizes, payments (Airtel Money, Moov Money, Remitly, Western Union), delivery (courier in Libreville 2,000–5,000 FCFA, international shipping DHL/FedEx) and promo codes.
If you don't know, say so honestly and invite the customer to contact us by email.`;

    // IMPORTANT : Gemini exige que le premier élément de l'historique soit role 'user'.
    // Le message de bienvenue (role 'model') doit être exclu.
    const allPrev = history.slice(0, -1);
    const firstUserIdx = allPrev.findIndex(m => m.role === 'user');
    const geminiHistory = (firstUserIdx === -1 ? [] : allPrev.slice(firstUserIdx)).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const model = getGenerativeModel(this.ai, {
      model: 'gemini-2.5-flash-lite',
      systemInstruction,
    });

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  }

  // ── Helpers privés ────────────────────────────────────────────────────────

  private async urlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Supprime "data:image/...;base64,"
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private detectMimeType(url: string): string {
    const lower = url.toLowerCase();
    if (lower.includes('.webp')) return 'image/webp';
    if (lower.includes('.png'))  return 'image/png';
    return 'image/jpeg';
  }
}
```

---

## Partie 5 — Interface admin : gestion des descriptions

### 5.1 Génération unitaire (bouton T par article)

Chaque article du tableau de catalogue dispose d'un bouton **T** (toggle) qui ouvre un panneau d'édition inline directement sous la ligne de l'article.

**Flux utilisateur :**
1. Cliquer **T** → ouvre le panneau avec les textareas FR et EN (pré-remplis si une description existe déjà)
2. Cliquer **✨ Générer avec l'IA** → Gemini analyse la photo de couverture et remplit automatiquement les deux textareas
3. Relire et modifier si besoin
4. Cliquer **Sauvegarder** → enregistre `descriptionFr` et `descriptionEn` en Firebase
5. Cliquer **T** à nouveau ou **Annuler** → ferme le panneau sans action

Le bouton T reste **violet plein** quand le panneau est ouvert (état actif visible).

### 5.2 Génération en masse (par catégorie)

Un bandeau au-dessus du tableau permet de générer les descriptions manquantes pour **tous les articles de la catégorie courante** en une seule action.

**Comportement :**
- Affiche le nombre d'articles sans description : `X articles sans description`
- Le bouton **✨ Générer les descriptions manquantes** est désactivé si tous les articles ont déjà une description
- Traitement **séquentiel** avec **1,5 seconde de délai entre chaque requête** pour respecter les rate limits de l'API Gemini
- Progression affichée en temps réel : `✨ 3 / 12…`
- En cas d'erreur sur un article, le message s'affiche et le traitement continue sur le suivant
- `✓ Terminé` s'affiche à la fin

> **⚠️ Rate limits Gemini** : Ne jamais envoyer les requêtes en parallèle (`Promise.all`). L'API Gemini a des limites de requêtes par minute. Le traitement séquentiel avec délai est obligatoire pour éviter les erreurs 429. Si des erreurs 429 apparaissent malgré le délai, augmenter à 3 secondes dans `generateAllDescriptions()`.

### 5.3 Effacement en masse (par catégorie)

Le bouton **🗑 Effacer les descriptions** permet de remettre à zéro toutes les descriptions de la catégorie courante avant une régénération complète.

**Comportement :**
- Une boîte de dialogue de confirmation s'affiche indiquant le nombre d'articles affectés
- L'effacement est **irréversible** (les champs `descriptionFr` et `descriptionEn` sont vidés en Firebase)
- Après effacement, le compteur "X articles sans description" se met à jour et le bouton de génération en masse se réactive

**Workflow recommandé pour régénérer toutes les descriptions :**
1. Cliquer **🗑 Effacer les descriptions** → confirmer
2. Cliquer **✨ Générer les descriptions manquantes** → attendre la fin
3. Réviser article par article avec le bouton **T** si nécessaire

### 5.4 Affichage côté client

Les descriptions générées sont automatiquement visibles dans le **modal produit** côté client (popup qui s'ouvre au clic sur un article).

**Flux de données :**
- `descriptionFr` / `descriptionEn` stockés dans Firebase sous `catalog/items/{id}/`
- Propagés dans `ItemInfos` (interface client) via le mapping dans `items.effects.ts` et `category.component.ts`
- Affichés dans `ItemDetailsComponent` selon la langue courante de l'application (FR/EN)
- Si aucune description : rien n'est affiché (le champ est optionnel)

---

## Partie 6 — Erreurs rencontrées et solutions

### Erreur 1 — `Cannot find module 'firebase/auth'` dans rxfire

**Symptôme** : Erreurs TypeScript dans les fichiers `.d.ts` de `rxfire` pointant vers des modules `firebase/*` introuvables.

**Cause** : rxfire 6.1.0 déclare `firebase ^9||^10||^11` comme peer dependency. Avec Firebase 12, le compilateur TS ne trouve pas les types.

**Solution** :
- Ajouter `"skipLibCheck": true` dans `tsconfig.json`
- Ajouter les `paths` firebase dans `tsconfig.json` (voir §3.2)

---

### Erreur 2 — `Cannot find module '@angular/material/toolbar'`

**Symptôme** : Après avoir changé `moduleResolution` de `"bundler"` à `"node"`, tous les imports `@angular/material/*` cassent.

**Cause** : Angular Material utilise le champ `exports` dans son `package.json` pour les sous-chemins (`/toolbar`, `/button`, etc.). Ce mécanisme n'est supporté qu'avec `moduleResolution: "bundler"` ou `"node16"`, pas avec `"node"` classique.

**Solution** : Revenir à `"moduleResolution": "bundler"` et utiliser les `paths` à la place.

---

### Erreur 3 — `FirebaseError: AI: First Content should be with role 'user', got model`

**Symptôme** : L'erreur apparaît à partir du **deuxième message** de la conversation. Le premier message fonctionne.

**Cause** : L'historique passé à `model.startChat({ history })` commence par le message de bienvenue (`role: 'model'`). L'API Gemini impose que le **premier élément de l'historique soit obligatoirement `role: 'user'`**.

**Solution** : Filtrer l'historique pour ne commencer qu'à partir du premier message utilisateur :

```typescript
const allPrev = history.slice(0, -1);
const firstUserIdx = allPrev.findIndex(m => m.role === 'user');
const geminiHistory = (firstUserIdx === -1 ? [] : allPrev.slice(firstUserIdx))
  .map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));
```

---

### Erreur 4 — `FirebaseError: 403 API_KEY_SERVICE_BLOCKED` sur `firebasevertexai.googleapis.com`

**Symptôme** : Les appels à Gemini échouent avec une erreur 403, même après avoir activé Firebase AI Logic dans la console Firebase.

**Causes possibles (à vérifier dans l'ordre)** :

| # | Cause | Solution |
|---|-------|----------|
| 1 | Firebase AI Logic API non activée dans GCP | Activer via https://console.cloud.google.com/apis/enableflow?apiid=firebasevertexai.googleapis.com |
| 2 | Clé API navigateur restreinte et Firebase AI Logic non incluse | GCP → APIs & Services → Credentials → Browser key → ajouter Firebase AI Logic API |
| 3 | Plan Spark (gratuit) actif | Passer au plan Blaze |
| 4 | Propagation des changements en cours | Attendre 2–5 minutes après toute modification |

---

### Erreur 5 — `CORS policy: No 'Access-Control-Allow-Origin'` sur Firebase Storage

**Symptôme** : En production, le clic sur le bouton ✨ ne fait rien ou génère une erreur CORS dans la console :
```
Access to fetch at 'https://firebasestorage.googleapis.com/...' from origin
'https://TON_APP.web.app' has been blocked by CORS policy
```

**Cause** : `urlToBase64()` utilise `fetch()` pour télécharger l'image. Firebase Storage bloque par défaut les requêtes cross-origin depuis le navigateur.

**Solution** : Configurer les CORS sur le bucket Firebase Storage (voir §2.3).

> **Note** : Cette erreur n'apparaît pas en développement local car `localhost` peut être dans une liste permissive, mais elle est systématique en production.

---

### Erreur 6 — Deprecation hint `currentLang` (@ngx-translate v17)

**Symptôme** : L'IDE affiche un hint TypeScript (code 6385) sur `this.translate.currentLang`.

**Cause** : `@ngx-translate/core` v17 a déprécié le getter `currentLang` au profit de la méthode `getCurrentLang()`.

**Solution** :
```typescript
// Avant (déprécié)
this.translate.currentLang

// Après
this.translate.getCurrentLang()
```

---

### Erreur 7 — Chatbot ne change pas de langue sans rafraîchir la page

**Symptôme** : Quand l'utilisateur change la langue de l'application, le chatbot continue à répondre dans l'ancienne langue.

**Cause** : La `systemInstruction` est bien lue dynamiquement à chaque appel, mais le **message de bienvenue** affiché dans le widget est statique et n'est pas mis à jour.

**Solution** : Dans `ChatWidgetComponent`, souscrire à `translate.onLangChange` :

```typescript
private langSub: Subscription;

constructor(
  private gemini: GeminiAiService,
  private translate: TranslateService,
  private cdr: ChangeDetectorRef,
) {
  this.langSub = this.translate.onLangChange.subscribe(() => {
    if (this.messages.length === 1 && this.messages[0].role === 'model') {
      this.addWelcomeMessage();
    }
    this.cdr.markForCheck();
  });
}

ngOnDestroy(): void {
  this.langSub.unsubscribe();
}
```

---

### Erreur 8 — Descriptions génériques, identiques entre articles

**Symptôme** : Les descriptions générées par Gemini se ressemblent toutes, sans mentionner les détails visuels spécifiques (couleur, longueur des manches, coupe…).

**Cause** : Un prompt trop court et non structuré pousse le modèle à produire des formules génériques ("Magnifique robe wax aux motifs colorés…") sans analyser vraiment l'image.

**Solution** : Structurer le prompt en deux étapes explicites — analyse visuelle d'abord, rédaction ensuite. Voir le prompt complet en §4.

---

## Partie 7 — Checklist de validation finale

- [ ] Plan Firebase : **Blaze** actif
- [ ] Firebase AI Logic activé dans Firebase Console
- [ ] API `firebasevertexai.googleapis.com` activée dans Google Cloud Console
- [ ] Clé API navigateur (Browser key) : **Firebase AI Logic API cochée** dans les restrictions
- [ ] CORS configurés sur le bucket Firebase Storage
- [ ] `skipLibCheck: true` dans `tsconfig.json`
- [ ] Paths firebase présents dans `tsconfig.json`
- [ ] `firebase.d.ts` dans `src/tsconfig.app.json`
- [ ] `firebase` version `^12.x` dans `package.json`
- [ ] `translate.getCurrentLang()` utilisé (pas `translate.currentLang`)
- [ ] Historique Gemini : ne commence jamais par `role: 'model'`
- [ ] Modèle utilisé : `gemini-2.5-flash-lite`
- [ ] Génération en masse : traitement séquentiel avec délai (pas `Promise.all`)

---

## Partie 8 — Architecture du code IA dans l'application

```
src/app/
├── core/
│   └── firebase/
│       └── gemini-ai.service.ts               ← Service central Gemini
│
├── features/
│   ├── admin/
│   │   └── admin-catalog/
│   │       ├── admin-catalog.component.ts     ← Génération unitaire + en masse + effacement
│   │       └── admin-catalog.component.html   ← Bouton T (toggle), panneau inline, bulk bar
│   └── store/
│       └── items.effects.ts                   ← Propagation descriptionFr/En → ItemInfos
│
└── shared/
    ├── components/
    │   ├── chat-widget/
    │   │   ├── chat-widget.component.ts       ← Chatbot conversationnel
    │   │   ├── chat-widget.component.html
    │   │   └── chat-widget.component.scss
    │   └── item-details/
    │       ├── item-details.component.ts      ← Affichage description côté client
    │       └── item-details.component.html
    └── interfaces/
        ├── catalog.interfaces.ts              ← CatalogItem : descriptionFr?, descriptionEn?
        └── image.interfaces.ts                ← ItemInfos : descriptionFr?, descriptionEn?
```

### Flux de données — Génération de description (unitaire)

```
Admin clique "T" → ouvre panneau
Admin clique "✨ Générer avec l'IA"
  → adminCatalog.generateDescription(item)
    → gemini.generateItemDescription(item.coverUrl, categoryTitle)
      → fetch(imageUrl) → base64          ← nécessite CORS Firebase Storage
      → getGenerativeModel('gemini-2.5-flash-lite')
      → model.generateContent([prompt structuré, { inlineData }])
      → parse JSON réponse
    → editingDescription = { fr, en }     ← pré-remplit les textareas
Admin relit / modifie → clique "Sauvegarder"
  → repo.updateItemField(id, 'descriptionFr', fr)
  → repo.updateItemField(id, 'descriptionEn', en)
```

### Flux de données — Génération en masse

```
Admin clique "✨ Générer les descriptions manquantes"
  → adminCatalog.generateAllDescriptions()
    → filtre categoryItems sans descriptionFr
    → pour chaque item (séquentiel) :
        → gemini.generateItemDescription(item.coverUrl, categoryTitle)
        → repo.updateItemField × 2
        → attendre 1 500 ms               ← évite les rate limits Gemini
    → affiche progression "3 / 12…"
```

### Flux de données — Affichage client

```
Firebase catalog/items/{id}/descriptionFr|En
  → CatalogRepository (stream temps réel)
    → items.effects.ts : new ItemInfos(..., item.descriptionFr, item.descriptionEn)
    → category.component.ts : idem
      → ItemDetailsComponent (modal produit)
        → description = lang === 'en' ? data.descriptionEn : data.descriptionFr
        → affiché sous les boutons d'action si non vide
```

### Flux de données — Chatbot

```
Utilisateur saisit un message
  → chatWidget.send()
    → gemini.sendChatMessage(text, history)
      → lang = translate.getCurrentLang()
      → construire systemInstruction (FR ou EN)
      → filtrer history : premier élément doit être role 'user'
      → getGenerativeModel('gemini-2.5-flash-lite', systemInstruction)
      → chat.sendMessage(userMessage)
      → retourner response.text()
    → afficher réponse dans le widget
```

---

## Récapitulatif des URLs importantes

| Action | URL |
|--------|-----|
| Console Firebase projet | https://console.firebase.google.com/project/delice-eternel-gabon |
| Activer Firebase AI Logic | https://console.firebase.google.com/project/delice-eternel-gabon/ai |
| Activer API GCP | https://console.cloud.google.com/apis/enableflow?apiid=firebasevertexai.googleapis.com&project=delice-eternel-gabon |
| Restrictions clé API | https://console.cloud.google.com/apis/credentials?project=delice-eternel-gabon |
| CORS Firebase Storage | https://console.cloud.google.com/storage/browser?project=delice-eternel-gabon |
| Facturation Firebase | https://console.firebase.google.com/project/delice-eternel-gabon/usage/details |
| Application en production | https://delice-eternel-gabon.web.app |
