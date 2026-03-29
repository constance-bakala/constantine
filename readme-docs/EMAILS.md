# Templates d'emails transactionnels — Délice Éternel

Les emails sont envoyés via **Brevo** (ex-Sendinblue) depuis les Firebase Functions.

---

## 1. Templates disponibles

| Fichier source | Template Brevo | Usage |
|---|---|---|
| `functions/src/templates/commande_envoyee.brevo.template.html` | Template #1 | Email envoyé au client après une commande |
| `functions/src/templates/mail_bienvenu.brevo.template.html` | Template #2 | Email envoyé à l'inscription |

---

## 2. Variables d'environnement

Les variables sont dans `functions/.env` (non versionné) :

```
BREVO_API_KEY=xkeysib-...
BREVO_FROM_EMAIL=delice.eternel.gabon@gmail.com
BREVO_FROM_NAME=Délice Éternel
BREVO_TEMPLATE_ORDER=1
BREVO_TEMPLATE_WELCOME=2
```

---

## 3. Mettre à jour un template

1. Modifier le fichier HTML source dans `functions/src/templates/`
2. Se connecter sur https://app.brevo.com
3. Menu **Transactionnel** → **Templates**
4. Cliquer sur le template à modifier (ex: "commande_envoyee" #1)
5. Cliquer sur **Modifier**
6. Passer en mode **Éditeur HTML** (icône `<>`)
7. Sélectionner tout (`Ctrl+A`) et remplacer par le contenu du fichier source
8. Cliquer sur **Enregistrer & Quitter**

---

## 4. Syntaxe Brevo (Jinja2)

```html
<!-- Variable simple -->
{{ params.displayName }}

<!-- Boucle sur les articles -->
{% for item in params.items %}
  {{ item.reference }}
  {{ item.price }} €
{% endfor %}
```

### Variables disponibles — template commande (#1)

```
{{ params.displayName }}   — nom du client
{{ params.items }}         — liste des articles
{{ params.totalHT }}       — total hors taxe
{{ params.tva }}           — TVA (10%)
{{ params.totalTTC }}      — total TTC
```

### Variables disponibles — template bienvenue (#2)

```
{{ params.displayName }}
{{ params.dressesLink }}
{{ params.masksLink }}
{{ params.earingsLink }}
```

---

## 5. Affichage des images dans le template commande (#1)

Les images des articles sont des chemins relatifs dans l'app Angular (ex: `assets/masks/MASK-1/cover.png`).
Avant l'envoi, le code Angular (`cart-items.component.ts`) les convertit en URLs absolues :

```typescript
item.path = prefix + '/' + item.path;
// résultat : https://delice-eternel-gabon.web.app/assets/masks/MASK-1/cover.png
```

Dans le template Brevo, l'image est affichée via :

```html
<img src="{{ item.path }}" width="280" ... />
```

> **Important :** les images ne s'affichent que si l'app Angular est déployée en production.
> En local (`http://localhost:4200`), les URLs générées ne sont pas accessibles depuis les serveurs
> de Brevo, donc les images apparaissent vides dans l'email reçu.
>
> Pour tester les emails avec les images, toujours envoyer une commande depuis
> **https://delice-eternel-gabon.web.app** et non depuis localhost.

---

## 6. Vérifier les logs d'envoi

### Via Firebase CLI

```bash
npx firebase functions:log --only genericBrevoEmail
npx firebase functions:log --only welcomeBrevoEmail
```

Logs utiles à surveiller :

```
[Brevo] genericBrevoEmail → { to, subject, itemsCount, totalTTC }   ← email envoyé
[Brevo] genericBrevoEmail ERROR ...                                  ← erreur d'envoi
[Brevo] welcomeBrevoEmail OK → email@example.com                    ← bienvenue envoyé
```

### Via la Console Firebase

1. Aller sur https://console.firebase.google.com/project/delice-eternel-gabon/functions
2. Cliquer sur la fonction (`genericBrevoEmail` ou `welcomeBrevoEmail`)
3. Onglet **Logs** — affiche les `console.log` et `console.error`

### Via Brevo

1. Se connecter sur https://app.brevo.com
2. Menu **Transactionnel** → **Logs**
3. Filtrer par date ou par adresse email destinataire
4. Cliquer sur un email pour voir :
   - Le statut (Délivré, Erreur, Bounce)
   - Le détail de l'erreur si applicable (ex : erreur de syntaxe dans le template)
