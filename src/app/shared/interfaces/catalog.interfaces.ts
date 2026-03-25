/**
 * Interfaces correspondant à la structure Firebase cible :
 *   catalog/categories/{prefix}/
 *   catalog/items/{pushKey}/
 */

export interface CatalogCategory {
  prefix: string;
  title: string;
  description?: string;    // FR
  descriptionEn?: string;  // EN
  published: boolean;
  createdAt: number;
  relatedCategories?: string[];
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
}

export interface CatalogState {
  categories: CatalogCategory[];
  /** Items publiés par categoryId */
  itemsByCategory: Record<string, CatalogItem[]>;
  loading: boolean;
  loaded: boolean;
}
