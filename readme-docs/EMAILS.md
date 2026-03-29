# Templates d'emails transactionnels — Délice Éternel

Les emails sont envoyés via **Brevo** (ex-Sendinblue) depuis les Firebase Functions.

**Compte Brevo :** se connecter sur https://app.brevo.com avec le compte **`delice.eternel.gabon@gmail.com`**

---

## 1. Templates disponibles

| Fichier source | Template Brevo | Déclencheur |
|---|---|---|
| `commande_envoyee.brevo.template.html` | #1 | Clic "Envoyer la commande" dans le panier |
| `mail_bienvenu.brevo.template.html` | #2 | Création de compte (Firebase Auth) |
| `commande_prete.brevo.template.html` | #4 | Commande prête — envoyé manuellement par l'admin |
| `commande_expediee.brevo.template.html` | #5 | Commande expédiée — envoyé manuellement par l'admin |

> Les templates `commande_prete` et `commande_expediee` doivent être créés sur Brevo et leurs IDs
> ajoutés dans `functions/.env`.

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

## 3. Mettre à jour un template existant

### Étapes

1. Modifier le fichier HTML source dans `functions/src/templates/`
2. Se connecter sur https://app.brevo.com
3. Menu **Transactionnel** → **Templates**
4. Cliquer sur le template à modifier (voir tableau ci-dessous)
5. Cliquer sur **Modifier**
6. Passer en mode **Éditeur HTML** (icône `<>` en haut à droite)
7. Sélectionner tout (`Ctrl+A`) et coller le contenu du fichier source
8. Cliquer sur **Enregistrer & Quitter**

### Correspondance fichiers ↔ templates Brevo

| Fichier source | Nom sur Brevo | ID |
|---|---|---|
| `commande_envoyee.brevo.template.html` | commande_envoyee | #1 |
| `mail_bienvenu.brevo.template.html` | mail_bienvenu | #2 |
| `commande_prete.brevo.template.html` | commande_prete | #4 |
| `commande_expediee.brevo.template.html` | commande_expediee | #5 |

### Créer un nouveau template sur Brevo

Pour `commande_prete` et `commande_expediee` qui n'existent pas encore sur Brevo :

1. Se connecter sur https://app.brevo.com
2. Menu **Transactionnel** → **Templates** → **Créer un template**
3. Donner un nom (ex : `commande_prete`)
4. Choisir **Éditeur HTML** → coller le contenu du fichier source
5. Cliquer sur **Enregistrer & Quitter**
6. Noter l'ID attribué par Brevo (visible dans la liste des templates)
7. Ajouter l'ID dans `functions/.env` :
   ```
   BREVO_TEMPLATE_READY=<id>
   BREVO_TEMPLATE_SHIPPED=<id>
   ```
8. Redéployer les functions : `npx firebase deploy --only functions`

### Tester après mise à jour

- Passer une commande de test depuis **https://delice-eternel-gabon.web.app** (pas localhost)
- Vérifier la réception de l'email
- En cas de problème, consulter les logs (voir section 6)

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

### Template #1 — commande_envoyee

```
{{ params.displayName }}        — nom du client
{{ params.items }}              — liste des articles
{{ params.totalHT }}            — total hors taxe
{{ params.tva }}                — TVA (10%)
{{ params.totalTTC }}           — total TTC
```

### Template #2 — mail_bienvenu

```
{{ params.displayName }}        — nom du client (ou email si pas de displayName)
{{ params.catalogLink }}        — URL de base de l'app (https://delice-eternel-gabon.web.app)
{{ params.categories }}         — liste des catégories publiées, récupérées dynamiquement depuis Firebase
                                   chaque entrée : { title: string, link: string }
```

Exemple de boucle Jinja2 dans le template :
```html
{% for cat in params.categories %}
  <a href="{{ cat.link }}">{{ cat.title }}</a>
{% endfor %}
```

> Les catégories sont chargées en temps réel depuis `catalog/categories` dans Firebase Realtime Database
> (uniquement celles dont `published: true`). Le lien de chaque catégorie est construit automatiquement :
> `https://delice-eternel-gabon.web.app/category/<prefix>`

### Template commande_prete

```
{{ params.customerName }}                      — nom du client
{{ params.orderId }}                           — référence commande (optionnel)
{{ params.deliveryModeLabel }}                 — mode de livraison (optionnel)
{{ params.shippingAddress }}                   — adresse (optionnel)
  .firstName / .lastName / .address1 / .address2
  .postalCode / .city / .country / .phone
{{ params.items }}                             — articles [{title, reference, basketInfos.selectedQuantity, linePriceFormatted}]
{{ params.itemsTotalFormatted }}               — sous-total articles
{{ params.tvaFormatted }}                      — TVA (optionnel)
{{ params.shippingCostFormatted }}             — frais de transport (optionnel)
{{ params.paymentAmountXAF }}                  — montant total à payer
{{ params.paymentPhone }}                      — numéro Airtel Money pour le paiement
```

### Template commande_expediee

```
{{ params.customerName }}                      — nom du client
{{ params.orderId }}                           — référence commande (optionnel)
{{ params.deliveryModeLabel }}                 — mode de livraison (optionnel)
{{ params.shippingAddress }}                   — adresse (optionnel)
  .firstName / .lastName / .address1 / .address2
  .postalCode / .city / .country / .phone
{{ params.trackingUrl }}                       — lien de suivi colis
{{ params.carrierName }}                       — nom du transporteur (optionnel)
{{ params.items }}                             — articles [{title, reference, basketInfos.selectedQuantity, linePriceFormatted}]
{{ params.tvaFormatted }}                      — TVA (optionnel)
{{ params.shippingCostFormatted }}             — frais de transport (optionnel)
{{ params.totalAmountXAF }}                    — total payé
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
