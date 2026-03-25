import { createSelector } from '@ngrx/store';
import { PromoState } from './promo.reducer';

// ── Sélecteur racine ───────────────────────────────────────────────────────────

export function selectPromoState(state: any): PromoState {
  return state.promo;
}

// ── Sélecteurs dérivés ─────────────────────────────────────────────────────────

/** Code promo actuellement appliqué (ou null). */
export const selectAppliedPromo = createSelector(
  selectPromoState,
  (state: PromoState) => state.appliedPromo
);

/** Statut de la dernière validation (idle / loading / valid / not_found / expired). */
export const selectPromoValidationStatus = createSelector(
  selectPromoState,
  (state: PromoState) => state.validationStatus
);

/** Vrai si une validation est en cours. */
export const selectPromoIsLoading = createSelector(
  selectPromoState,
  (state: PromoState) => state.validationStatus === 'loading'
);
