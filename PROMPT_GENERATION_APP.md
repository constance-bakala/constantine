# Prompt de génération — Application "Délice Éternel"

> Ce prompt exhaustif décrit l'application dans son état actuel.
> Il peut servir de base pour générer une application similaire en remplaçant
> le nom, les activités, la configuration Firebase et les couleurs.

---

```
Crée une application Angular 17 e-commerce / portfolio complète avec Firebase,
nommée "Délice Éternel", pour une artisane proposant plusieurs activités
(couture, coiffure, esthétique, mode africaine) à Libreville, Gabon.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STACK TECHNIQUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Angular 17 (modules non-standalone, lazy loading)
- NgRx 17 (Store + Effects + RouterStore)
- @angular/fire 17 (Realtime Database, Storage, Auth, Functions)
- Angular Material 17 (MatDialog uniquement)
- Bootstrap 5 (layout uniquement)
- ngx-translate 15 (i18n FR/EN)
- ngx-quill (éditeur WYSIWYG pour descriptions)
- SCSS avec thème sombre violet (#6c3483)
- Firebase Hosting + Firebase Functions (Node 18, TypeScript)
- Brevo (ex-Sendinblue) pour les emails transactionnels

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONFIGURATION FIREBASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firebase project ID : delice-eternel-gabon
databaseURL        : https://delice-eternel-gabon.firebaseio.com
storageBucket      : delice-eternel-gabon.appspot.com
authDomain         : delice-eternel-gabon.firebaseapp.com

Auth : Email/Password uniquement. Un seul admin (email fixe).
Realtime Database structure :

  catalog/
    categories/{prefix}/
      prefix: string          (URI-safe : [a-z0-9][a-z0-9-]*[a-z0-9])
      title: string
      description: string     (HTML, FR)
      descriptionEn: string   (HTML, EN)
      published: boolean
      createdAt: number
    items/{pushKey}/
      id: string
      categoryId: string      (= prefix)
      reference: string       (ex: "MASK-1")
      priceXAF: number
      stock: number
      published: boolean
      createdAt: number
      coverUrl: string
      images: string[]        (URLs WebP optimisées)

  orders/{orderId}/
    uid, status, customerEmail, customerName,
    items[], createdAt, deliveryMode, shippingAddress,
    trackingUrl, carrierName, shippingCost

  stock/{reference}/
    available: number         (décrémenté à chaque commande)

  users/{uid}/
    basket: any[]
    commends: any
    orderStatus/{orderId}/...

  config/
    carousel/[]/
      imageUrl: string
      alt: string
      storagePath: string     (chemin Storage pour suppression)
    i18n/fr/...               (traductions imbriquées)
    i18n/en/...
    appTitle/
      fr: string
      en: string

Firebase Storage structure :
  catalog/{categoryId}/{timestamp}_{filename}.webp   (images articles)
  config/carousel/{timestamp}_{filename}             (images carousel)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROUTING (lazy loading)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/               → WelcomeModule        (public)
/category/:prefix → CategoryModule     (public, dynamique)
/shopping-cart  → ShoppingCartModule   (public)
/order-history  → OrderHistoryModule   (auth guard)
/admin          → AdminModule          (auth guard + admin guard)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NGRX STORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Slices :
  auth    → { isAuthenticated, userId, error }
  items   → { items: ItemInfos[], loaded }   (panier + sélection)
  catalog → { categories: CatalogCategory[], itemsByCategory: Record<string,CatalogItem[]>, loading, loaded }

CatalogEffects :
  - loadCategories$ : defer() + watchCategories() RTDB temps réel → CatalogLoadCategoriesSuccess
  - loadItemsForCategory$ : mergeMap (parallel) sur LOAD_ITEMS_FOR_CATEGORY
    → watchPublishedItemsByCategory(prefix) RTDB temps réel

Sélecteurs catalog :
  selectAllCategories, selectPublishedCategories,
  selectCatalogLoaded, selectCatalogLoading,
  selectItemsByCategory(prefix), selectHasCatalogItemsFor(prefix)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERFACES MÉTIER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CatalogCategory { prefix, title, description?, descriptionEn?, published, createdAt }
CatalogItem     { id, categoryId, reference, priceXAF, stock, published, createdAt, coverUrl, images? }
CatalogState    { categories[], itemsByCategory{}, loading, loaded }

ItemInfos (panier) { imageUrl, inBasket, reference, index, category, selected,
                     basketInfos{selectedQuantity,selectedSize,selectedModel},
                     allImages[], priceEur }

ImportGroup (admin import) { key, files: File[], previews: string[],
                             coverIndex: number, priceXAF, stock }

Order { id, uid?, status, customerEmail, customerName, items[], createdAt,
        deliveryMode:'pickup'|'shipping', shippingAddress?, trackingUrl?,
        carrierName?, shippingCost? }

CarouselSlide { imageUrl, alt?, storagePath? }
TranslationRow { key, fr, en, dirty }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPOSITORIES FIREBASE (services Angular)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CatalogRepository :
  - watchCategories() : Observable<CatalogCategory[]>  (onValue temps réel)
  - watchPublishedItemsByCategory(prefix) : Observable<CatalogItem[]>
  - createCategory(prefix, title, description?, descriptionEn?) : Promise<void>
  - updateCategoryPublished(prefix, published) : Promise<void>
  - updateCategoryDescription(prefix, fr, en) : Promise<void>
  - deleteCategory(prefix) : Promise<void>
  - createItem(categoryId, data) : Promise<void>  (push + référence auto PREFIX.upper()+"-"+N)
  - updateItemField(id, field:'stock'|'price', value) : Promise<void>
  - updateItemPublished(id, published) : Promise<void>
  - deleteItem(item) : Promise<void>  (RTDB + Storage)
  - uploadItemImage(categoryId, file) : Promise<string>  (Storage → URL WebP)

UsersRepository :
  - saveBasket(uid, items[]) : Promise<void>  (users/{uid}/basket)
  - getBasket(uid) : Observable<any[]|null>
  - watchCommands(uid) : Observable<ItemInfos[]>
  - getOrderStatus(uid) : Observable<Record|null>

AppConfigRepository :
  - watchCarousel() : Observable<CarouselSlide[]>  (config/carousel)
  - saveCarousel(slides[]) : Promise<void>
  - uploadCarouselImage(file) : Promise<CarouselSlide>  (Storage config/carousel/)
  - deleteCarouselImage(slide) : Promise<void>
  - watchAppTitle() : Observable<{fr,en}>
  - saveAppTitle(fr, en) : Promise<void>
  - getTranslationsOnce(lang) : Promise<Record|null>
  - saveTranslations(lang, translations) : Promise<void>
  - loadStaticTranslations(lang) : Promise<Record>  (assets/i18n/{lang}.json)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPOSANTS PUBLICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WelcomeComponent (/):
  - Charge toutes les catégories publiées depuis selectPublishedCategories
  - Dispatche CatalogLoadItemsForCategory pour chaque catégorie
    (distinctUntilChanged sur la liste des prefixes)
  - Affiche une grille de cartes portfolio (PortfolioListComponent)
  - Chaque carte = une catégorie, avec ses images d'articles en rotation

PortfolioItemComponent :
  - Reçoit imageUrls: string[] (toutes les images de la catégorie)
  - setInterval toutes les 3s, démarre à un index aléatoire
  - Affiche currentImageUrl, avec lien vers /category/{prefix}
  - clearInterval dans ngOnDestroy

CategoryComponent (/category/:prefix) :
  - Lit :prefix depuis ActivatedRoute
  - Dispatche CatalogLoadItemsForCategory({ categoryId: prefix })
  - Combine selectPublishedCategories + selectItemsByCategory(prefix)
  - Construit category$ : Observable<Category|null> avec :
      name = prefix as unknown as ItemsCategoriesEnum
      title, summary (description FR), summaryEn (description EN)
      items = CatalogItem[] → ItemInfos[] (priceEur = Math.round(priceXAF/655.96*100)/100)
  - Construit categoryInfos$ excluant la catégorie courante pour VOIR AUSSI
  - Affiche <app-portfolio-list> avec les items
  - Affiche <app-category-buttons> pour navigation VOIR AUSSI
  - Template de fallback "Catégorie introuvable" si category$ émet null

HeaderComponent :
  - watchCarousel() → carousel dynamique depuis Firebase
  - Fallback sur logo local si tableau vide : [{ imageUrl: 'assets/logo.png', alt: '...' }]
  - Affiche le titre de l'app depuis watchAppTitle()
  - Liens de navigation + bouton panier avec badge

ItemDetailsComponent (MatDialog) :
  - Affiche détail d'un article : images, référence, prix
  - Masque la ligne "Catégorie" si value === 'UNKNOWN'
  - Gestion taille / quantité / modèle
  - Bouton "Ajouter au panier"

CategoryButtonsComponent (VOIR AUSSI) :
  - @Input categoryInfos : Record<prefix, {name, title}>
  - @Input categoryToAvoid : string (préfixe courant)
  - Filtre les clés !== categoryToAvoid, avec .filter(Boolean)
  - Émet navigateAway(prefix) pour naviguer
  - Boutons Facebook/Twitter share

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPOSANTS ADMIN (route /admin, auth guard)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AdminDashboardComponent — 3 onglets :
  activeTab: 'orders' | 'catalog' | 'settings'

  Onglet Commandes :
    - onValue(ref(db,'orders')) temps réel, trié par createdAt desc
    - Filtrable par id/nom/email client
    - Pagination 10 par page
    - Statuts : pending → ready → paid → shipped / cancelled
    - Vue liste + vue détail d'une commande
    - Calcul HT/TVA(10% si expédition)/TTC en FCFA (taux 655.96)
    - Formulaire "prête" : saisie frais de port (shippingCost)
    - Formulaire "expédiée" : trackingUrl + carrierName
    - Annulation : restaure stock via runTransaction, supprime orders +
      users/{uid}/orderStatus + commends
    - Renvoi email paiement via Firebase Function resendPaymentEmail
    - Via httpsCallable : updateOrderStatus, resendPaymentEmail

  Onglet Catalogue (AdminCatalogComponent) :
    VUE LISTE DES CATÉGORIES :
      - Formulaire création : prefix (URI-safe, sanitisé temps réel),
        title, description FR+EN (Quill)
      - Sanitisation prefix : normalize NFD, lowercase, remplace invalides
        par '-', collapse multi-tirets, trim
      - Validation regex /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/
      - Bouton Publier/Dépublier par catégorie
      - Bouton Gérer → VUE DÉTAIL
      - Bouton supprimer catégorie

    VUE DÉTAIL D'UNE CATÉGORIE :
      Section Description :
        - Affichage FR + EN (innerHTML)
        - Édition inline avec Quill (onglets FR/EN + aperçu live côte-à-côte)

      Section Import articles :
        - Drop zone (drag & drop + click → file picker), accept="image/*", multiple
        - Regroupement automatique par nom :
            "mask-1-cover.webp" et "mask-1-a.webp" → groupe "mask-1"
            (supprime suffixe -cover et -[a-e])
        - coverIndex auto : fichier contenant "cover" dans le nom, sinon index 0
        - Interface ImportGroup[] : key, files, previews, coverIndex, priceXAF, stock
        - Barre d'outils regroupement manuel :
            Mode regroupement : sélection multi-images par Set<"gi-fi">
            → clic "Regrouper N images" → panneau pendingMerge
            → admin choisit la couverture (clic sur image → badge Cover)
            → "Confirmer le regroupement" → nouveau groupe fusionné
        - Par groupe : champ prix FCFA + champ stock
        - Clic sur image hors mode sélection → setCover(gi, fi)
        - Bouton "Importer N article(s)" → uploadBytes Storage + push RTDB
          (référence auto : PREFIX.upper() + "-" + (maxIndex+1))
        - Lightbox pour prévisualisation

      Section Articles :
        - Tableau : thumb | référence | stock (éditable inline) |
          prix FCFA (éditable inline) | statut publié | supprimer
        - Pagination 10 par page
        - Stock réel depuis RTDB stock/{reference}/available (onValue)
        - Édition inline : keyup.enter = save, escape = cancel
        - Ligne grisée si !published

  Onglet Paramètres (AdminSettingsComponent) :
    Section Carousel :
      - Liste des slides actuelles (aperçu + bouton supprimer + flèches ordre)
      - Drop zone upload nouvelles images (Storage config/carousel/{ts}_{name})
      - Sauvegarde automatique après chaque modification (RTDB config/carousel)

    Section Libellés (traductions) :
      - Bouton "Charger les libellés" → fusionne static JSON + overrides Firebase
      - Tableau clé / FR / EN (tous éditables), filtrable par texte
      - Compteur de modifications non sauvegardées
      - Bouton "Enregistrer" → unflatten + save dans config/i18n/fr et config/i18n/en

    Section Titre :
      - Champs FR + EN
      - Sauvegarde dans config/appTitle + met à jour <title> du document

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERNATIONALISATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- ngx-translate avec TranslateModule.forRoot()
- Custom TranslateLoader :
    1. Charge assets/i18n/{lang}.json (source de vérité statique)
    2. Fusionne avec config/i18n/{lang} Firebase (override dynamique)
    3. deep merge : clés Firebase écrasent le statique, clés manquantes gardées
- Langues : FR (défaut) et EN
- Sélecteur de langue dans le header
- appTitle dynamique depuis config/appTitle/{lang}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIREBASE FUNCTIONS (Node 18, TypeScript)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

updateOrderStatus (httpsCallable) :
  - Params : { orderId, status, shippingCost?, trackingUrl?, carrierName? }
  - Met à jour orders/{orderId}/status
  - Met à jour users/{uid}/orderStatus/{orderId}
  - Si status==='ready' : décrémente stock/{reference}/available via transaction
  - Envoie email Brevo au client

resendPaymentEmail (httpsCallable) :
  - Recharge l'ordre et renvoie l'email de paiement

processUploadedCatalogImage (Storage trigger) :
  - Se déclenche sur upload dans catalog/
  - Redimensionne et convertit en WebP (thumb 200px, medium 600px, full 1200px)
  - Met à jour les URLs dans RTDB catalog/items/{id}/images[]

welcomeBrevoEmail / genericBrevoEmail :
  - Templates Brevo pour email de bienvenue et email générique

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PANIER & COMMANDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Panier géré dans NgRx slice "items"
- Persisté dans RTDB users/{uid}/basket à chaque modification
- Chargé depuis Firebase au login
- ShoppingCartComponent : liste items, quantités, tailles, total
- Validation commande : choix pickup (Libreville) ou shipping (international)
- Paiement via lien externe (Mobile Money / virement)
- OrderHistoryComponent : liste commandes de l'utilisateur connecté
  depuis users/{uid}/orderStatus, avec statut en temps réel

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTHENTIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Firebase Auth Email/Password
- AuthGuard : redirige vers /login si non connecté
- AdminGuard : vérifie le custom claim "admin" ou email admin fixe
- Login via LoginComponent (email + password)
- Déconnexion depuis le header
- Au login : chargement panier Firebase + dispatch auth success

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STYLE & DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Thème sombre : backgrounds #0a0a1a, #111128, #1a1a2e
- Couleur principale : $purple: #6c3483
- Police : système (sans-serif)
- Carousel plein écran en page d'accueil avec images Firebase
- Grille portfolio : cards avec image rotative toutes les 3s
- Tables admin : design compact, lignes dépubliées grisées
- Lightbox : overlay sombre + image centrée
- Responsive Bootstrap (col-md-6 col-lg-4)
- index.html : <base href="/"> (obligatoire pour les routes imbriquées)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCRIPT DE NETTOYAGE (functions/wipe.js)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Script Node.js one-shot (firebase-admin) qui :
- Supprime tous les utilisateurs Auth sauf l'admin (par email)
- Supprime les nœuds RTDB : catalog/, orders/, stock/, prices/,
  config/carousel/, users/ (sauf uid admin)
- Supprime Storage : catalog/ et config/carousel/
- Conserve : config/i18n/, config/appTitle/, users/{adminUid}
Nécessite : functions/serviceAccountKey.json (clé de service Firebase, dans .gitignore)
Usage : cd functions && node wipe.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENU INITIAL i18n — assets/i18n/fr.json
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Toutes les clés sont utilisées via le pipe | translate dans les templates.
Les clés imbriquées s'accèdent avec la notation pointée : "PRODUCTS.MORE".

{
  "ABOUT": "À PROPOS",
  "DISCONNECT": "Déconnexion",
  "CONNECT": "Connexion",
  "PRESENTATION": "Masques grand public - Bijoux - Vêtements",
  "BUILD_PLACE": "Conçus dans nos ateliers",
  "CONTACT_US": "CONTACTEZ NOUS",
  "TELEPHONE": "Téléphone",
  "EMAIL": "Mel",
  "SHARE": "Partager",
  "SEE_ALSO": "Voir aussi",
  "SELECT": "Sélectionner",
  "ADD_TO_CART": "Ajouter au panier",
  "REMOVE_FROM_CART": "Supprimer du panier",
  "OUT_OF_STOCK": "Épuisé",
  "DETAILS": "Détails",
  "CANCEL": "Annuler",
  "CHOOSE": "Choisissez",
  "CLOSE": "Fermer",
  "ON_INTERNET": "Sur internet",
  "LOCALIZATION": "Localisation",
  "LOCALIZATION_DESCRIPTION": "Face à la boîte de nuit 'Les Planches', Libreville",
  "NOMBAKELE": "Quartier Nombakélé",
  "ABOUT_ME": "À propos de moi",
  "DO_NOT_HESITATE": "N'hésitez pas à choisir des articles. Vous pourrez acheter ou annuler ces articles à tout moment!",
  "MY_ORDERS": "Mes commandes",
  "SHIPPING_PENDING": "Prix à confirmer",
  "COMMAND_SENT_MSG": "Félicitation, votre commande a été envoyée avec succès!",
  "COMMAND_NOT_SENT": "Commande non envoyée",
  "COMMAND_ALREADY_EXIST": "Cette commande existe déjà! Vous devez la mettre à jour pour la transmettre de nouveau!",
  "AUTHENTICATION_REQUIRED": "Vous devez être authentifié pour envoyer une commande!",
  "NEW_ORDER_TITLE": "Nouvelle commande Délice Éternel",
  "ABOUT_MY_APPLICATION": "Délice éternel est à la fois un prêt à porter et un grossiste de Libreville qui vous propose des vêtements africains pour tous les âges. Vous pouvez également demander un modèle précis et nous le cousons pour vous! Vous avez besoin d'une importante commande? Contactez-nous pour affiner votre besoin. Nous faisons le maximum pour vous livrer très rapidement où que vous soyez!",
  "ABOUT_WEBDESIGNER": "Ce site a été conçu par la société up2date-it (up2dateit@gmail.com). En cas de difficultés rencontrés sur ce site ou avec votre commande, n'hésitez pas à envoyer un message à cette adresse en détaillant de façon claire votre problème. Laissez vos coordonnées, nous vous rappellerons dès que possible! Vos préoccupations sont les nôtres!",
  "ABOUT_CONSTANCE": "Je suis une coiffeuse-esthéticienne et couturière professionnelle. Ces métiers sont pour moi des formes d'expression artistiques qui me passionnent et me permettent de m'épanouir au quotidien.",
  "PRODUCTS": {
    "MORE": "Voir les produits",
    "CATEGORY": "Catégorie",
    "MODEL": "Modèle",
    "UNIQUE_MODEL": "Modèle unique",
    "SIZES": "Tailles",
    "REMOVE": "Supprimer",
    "SUMMARY": "Résumé de votre commande",
    "CURRENCY": "Devise",
    "BASKET": "Votre panier",
    "CART": "Panier",
    "TOTAL_WITH_VAT": "Total TTC",
    "WITH_VAT": "",
    "SHIPPING": "Transport",
    "GRATIS": "Gratuit",
    "DISCOUNT_CODE": "Ajouter un code promo (optionnel)",
    "AMOUNT_WITHOUT_VAT": "Montant HT",
    "SEND_COMMAND": "Transmettre la commande",
    "DELIVERY_TIME": "Mode de livraison",
    "DELIVERY_PICKUP": "Retrait en magasin — Libreville",
    "DELIVERY_SHIPPING": "Expédition internationale",
    "PAYMENTS_MEANS": "Moyens de paiement acceptés",
    "PAYMENTS_MEANS_DETAILS": "Envoyez-nous votre commande par mel en cliquant sur le bouton",
    "WILL_CALL_YOU_BACK": "et nous vous rappelerons dès sa réception pour votre livraison!",
    "HOW_TO_GET_DELIVERED_FROM_LBV": "Si vous vivez à Libreville et que vous achetez au détail, alors vous devez passez directement au magasin après votre commande, nous vous la préparons.",
    "HOW_TO_GET_DELIVERED_FROM_ELSEWHERE": "Si vous vivez ailleurs dans le monde, nous vous informons que les frais d'expédition seront à votre charge."
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENU INITIAL i18n — assets/i18n/en.json
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "ABOUT": "ABOUT",
  "DISCONNECT": "Logout",
  "CONNECT": "Login",
  "PRESENTATION": "Masks for the general public - Jewellery - Clothing",
  "BUILD_PLACE": "Designed in our workshops",
  "CONTACT_US": "CONTACT US",
  "TELEPHONE": "Phone",
  "EMAIL": "Email",
  "SHARE": "Share",
  "SEE_ALSO": "See also",
  "SELECT": "Add to cart",
  "ADD_TO_CART": "Add to cart",
  "REMOVE_FROM_CART": "Remove from cart",
  "OUT_OF_STOCK": "Out of stock",
  "DETAILS": "Details",
  "CANCEL": "Cancel",
  "CHOOSE": "Choose",
  "CLOSE": "Close",
  "ON_INTERNET": "On the web",
  "LOCALIZATION": "Localization",
  "LOCALIZATION_DESCRIPTION": "Near the night club 'Les Planches', Libreville",
  "NOMBAKELE": "District Nombakélé",
  "ABOUT_ME": "About me",
  "DO_NOT_HESITATE": "Do not delay the purchase, adding items to your cart does not mean booking them",
  "MY_ORDERS": "My orders",
  "SHIPPING_PENDING": "Price to be confirmed",
  "COMMAND_SENT_MSG": "Congratulation, your order has been sent successfully",
  "COMMAND_NOT_SENT": "Order not executed",
  "COMMAND_ALREADY_EXIST": "This order has already been sent, you must modify it to send it again!",
  "AUTHENTICATION_REQUIRED": "You must be authenticated to make an order.",
  "NEW_ORDER_TITLE": "New Délice Éternel order",
  "ABOUT_MY_APPLICATION": "Délice éternel is a ready-to-wear warehouse from Libreville which offers African clothing for all ages. You can also request a specific model and we will sew it for you! Do you have an important order to make? Contact us to refine your request. We do our best to deliver you very quickly wherever you are!",
  "ABOUT_WEBDESIGNER": "This web site was designed by the company up2date-it (up2dateit@gmail.com). In case of troubles encountered on this site or with your order, do not hesitate to send a message to this address. Make sure that your problem is clearly detailed. Leave your email and phone number, we will call you back as soon as possible! Your concerns are ours!",
  "ABOUT_CONSTANCE": "I am a professional hairdresser-esthetician and a seamstress. These professions are for me artistic forms of expression that fascinate me and allow me to thrive every day.",
  "PRODUCTS": {
    "MORE": "More products",
    "CATEGORY": "Category",
    "MODEL": "Model",
    "UNIQUE_MODEL": "Unique model",
    "SIZES": "Sizes",
    "REMOVE": "Remove",
    "SUMMARY": "Summary",
    "CURRENCY": "Currency",
    "BASKET": "Your basket",
    "CART": "Cart",
    "TOTAL_WITH_VAT": "The total amount of",
    "WITH_VAT": "(including VAT)",
    "SHIPPING": "Shipping",
    "GRATIS": "GRATIS",
    "DISCOUNT_CODE": "Add a discount code (optional)",
    "AMOUNT_WITHOUT_VAT": "Temp amount",
    "SEND_COMMAND": "Send your command",
    "DELIVERY_TIME": "Delivery method",
    "DELIVERY_PICKUP": "Store pickup — Libreville",
    "DELIVERY_SHIPPING": "International shipping",
    "PAYMENTS_MEANS": "Accepted payment methods",
    "PAYMENTS_MEANS_DETAILS": "Send your demand threw email by clicking on the button",
    "WILL_CALL_YOU_BACK": "and we will get in touch with you as soon as possible!",
    "HOW_TO_GET_DELIVERED_FROM_LBV": "If you live in Libreville and you make a retail purchase, then you have to go directly to the store after your order, we prepare it.",
    "HOW_TO_GET_DELIVERED_FROM_ELSEWHERE": "If you live elsewhere in the world, you will be charged the shipping costs of your products. Just check the box below to continue"
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORRESPONDANCE CLÉS ↔ USAGE DANS L'APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ABOUT                       → Lien navigation "À PROPOS" dans le header
DISCONNECT / CONNECT        → Boutons auth dans le header
PRESENTATION                → Sous-titre de la page d'accueil / header
BUILD_PLACE                 → Mention atelier dans le header
CONTACT_US                  → Section contact dans la page À PROPOS
TELEPHONE / EMAIL           → Coordonnées dans la section contact
SHARE                       → Bouton partage dans CategoryButtonsComponent
SEE_ALSO                    → Titre section "Voir aussi" (catégories voisines)
SELECT                      → Bouton sélection article dans la liste
ADD_TO_CART                 → Bouton dans ItemDetailsComponent (dialog)
REMOVE_FROM_CART            → Bouton suppression dans le panier
OUT_OF_STOCK                → Affiché quand stock = 0
DETAILS                     → Bouton ouverture dialog détail article
CANCEL                      → Bouton annulation générique
CHOOSE                      → Placeholder sélecteur taille/modèle
CLOSE                       → Bouton fermeture dialog / lightbox
ON_INTERNET                 → Label réseaux sociaux dans À PROPOS
LOCALIZATION                → Titre section localisation dans À PROPOS
LOCALIZATION_DESCRIPTION    → Adresse textuelle du magasin
NOMBAKELE                   → Quartier affiché dans la section localisation
ABOUT_ME                    → Titre section biographie
DO_NOT_HESITATE             → Message d'encouragement dans le panier vide
MY_ORDERS                   → Lien navigation vers /order-history
SHIPPING_PENDING            → Affiché dans order-history quand shippingCost non confirmé
COMMAND_SENT_MSG            → Toast succès après envoi commande
COMMAND_NOT_SENT            → Toast erreur envoi commande
COMMAND_ALREADY_EXIST       → Erreur commande déjà existante
AUTHENTICATION_REQUIRED     → Erreur si commande sans être connecté
NEW_ORDER_TITLE             → Objet de l'email de commande envoyé à l'admin
ABOUT_MY_APPLICATION        → Texte long de présentation dans la page À PROPOS
ABOUT_WEBDESIGNER           → Mention du développeur dans la page À PROPOS
ABOUT_CONSTANCE             → Bio de l'artisane dans la page À PROPOS
PRODUCTS.MORE               → Bouton "Voir les produits" sur les cards portfolio
PRODUCTS.CATEGORY           → Label champ catégorie dans ItemDetailsComponent
PRODUCTS.MODEL              → Label champ modèle dans ItemDetailsComponent
PRODUCTS.UNIQUE_MODEL       → Valeur affichée si modèle unique
PRODUCTS.SIZES              → Label champ tailles dans ItemDetailsComponent
PRODUCTS.REMOVE             → Bouton suppression dans le panier
PRODUCTS.SUMMARY            → Titre section récapitulatif dans ShoppingCartComponent
PRODUCTS.CURRENCY           → Label devise dans le récapitulatif
PRODUCTS.BASKET             → Titre section panier dans ShoppingCartComponent
PRODUCTS.CART               → Badge panier dans le header
PRODUCTS.TOTAL_WITH_VAT     → Label total TTC dans ShoppingCartComponent
PRODUCTS.WITH_VAT           → Mention TVA incluse (vide en FR, "(including VAT)" en EN)
PRODUCTS.SHIPPING           → Label frais de port
PRODUCTS.GRATIS             → Affiché quand livraison gratuite (retrait magasin)
PRODUCTS.DISCOUNT_CODE      → Placeholder champ code promo
PRODUCTS.AMOUNT_WITHOUT_VAT → Label montant HT
PRODUCTS.SEND_COMMAND       → Bouton envoi commande dans ShoppingCartComponent
PRODUCTS.DELIVERY_TIME      → Titre section choix livraison
PRODUCTS.DELIVERY_PICKUP    → Option retrait en magasin Libreville
PRODUCTS.DELIVERY_SHIPPING  → Option expédition internationale
PRODUCTS.PAYMENTS_MEANS     → Titre section moyens de paiement
PRODUCTS.PAYMENTS_MEANS_DETAILS → Instructions paiement par email
PRODUCTS.WILL_CALL_YOU_BACK → Suite des instructions paiement
PRODUCTS.HOW_TO_GET_DELIVERED_FROM_LBV      → Info livraison locale
PRODUCTS.HOW_TO_GET_DELIVERED_FROM_ELSEWHERE → Info livraison internationale
```
