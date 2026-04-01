/**
 * Interfaces correspondant à la structure Firebase cible :
 *   catalog/categories/{prefix}/
 *   catalog/items/{pushKey}/
 */

export interface CatalogCategory {
  prefix: string;
  title: string;           // FR
  titleEn?: string;        // EN
  description?: string;    // FR
  descriptionEn?: string;  // EN
  published: boolean;
  createdAt: number;
  relatedCategories?: string[];
  /** Catégories qui complètent le look (générées par IA) */
  complementaryCategories?: string[];
  /** Afficher ou non la section "Vos suggestions" sur la page catégorie */
  complementaryLookEnabled?: boolean;
  /** Texte promotionnel IA pour Instagram/WhatsApp */
  promoTextFr?: string;
  promoTextEn?: string;
}

export interface CatalogItem {
  /** pushKey Firebase */
  id: string;
  /** = prefix de la catégorie (ex: "mask", "dress", "earing") */
  categoryId: string;
  /** auto-généré : PREFIX.toUpperCase() + "-" + N  (ex: "MASK-7") */
  reference: string;
  priceXAF: number;
  stock: number;
  published: boolean;
  createdAt: number;
  coverUrl: string;
  /** URLs WebP optimisées (thumb, medium, full) */
  images?: string[];
  /** Description commerciale générée par IA ou saisie manuellement */
  descriptionFr?: string;
  descriptionEn?: string;
  /** URL photo générée par IA (virtual try-on) */
  tryonUrl?: string;
  /** IDs des articles complémentaires suggérés par l'IA (max 4, depuis les catégories complémentaires) */
  complementaryItemRefs?: string[];
}

export interface CatalogState {
  categories: CatalogCategory[];
  /** Items publiés par categoryId */
  itemsByCategory: Record<string, CatalogItem[]>;
  loading: boolean;
  loaded: boolean;
}
