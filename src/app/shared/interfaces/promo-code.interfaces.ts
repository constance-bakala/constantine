// ── Modèle de données ──────────────────────────────────────────────────────────

export interface PromoCode {
  id: string;
  /** Code saisi par l'utilisateur (toujours en majuscules). */
  code: string;
  /** Pourcentage de réduction appliqué (1–100). */
  discountPercent: number;
  /** Prefix de la catégorie concernée (ex : "ROBES"). */
  categoryId: string;
  /** Début de validité (timestamp ms). */
  startDate: number;
  /** Fin de validité, incluse (timestamp ms, fin de journée). */
  endDate: number;
  /** Date de création (timestamp ms). */
  createdAt: number;
}

// ── Résultat de validation ─────────────────────────────────────────────────────

/** Motif retourné par la validation d'un code. */
export type PromoValidationStatus = 'valid' | 'not_found' | 'expired';

export interface PromoValidationResult {
  status: PromoValidationStatus;
  /** Renseigné si le code est trouvé en base (valide ou expiré). */
  promo: PromoCode | null;
}
