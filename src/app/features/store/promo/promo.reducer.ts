import { Action, ActionReducer } from '@ngrx/store';
import { PromoCode, PromoValidationStatus } from '@shared/interfaces/promo-code.interfaces';
import { PromoActions, PromoActionTypes } from './promo.actions';

// ── Interface d'état ───────────────────────────────────────────────────────────

export interface PromoState {
  /** Code promo actuellement appliqué, ou null si aucun. */
  appliedPromo: PromoCode | null;
  /**
   * Statut de la dernière tentative de validation :
   * - idle     : aucune tentative
   * - loading  : validation en cours (appel Firebase)
   * - valid    : code accepté
   * - not_found: code inconnu
   * - expired  : code hors période
   */
  validationStatus: 'idle' | 'loading' | PromoValidationStatus;
}

// ── Persistance localStorage ───────────────────────────────────────────────────

const PROMO_STORAGE_KEY = 'promo_applied';

function loadPromoFromStorage(): PromoCode | null {
  try {
    const raw = localStorage.getItem(PROMO_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PromoCode) : null;
  } catch {
    return null;
  }
}

function savePromoToStorage(promo: PromoCode | null): void {
  try {
    if (promo) {
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promo));
    } else {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    }
  } catch { /* SSR / navigation privée */ }
}

/**
 * Meta-reducer qui synchronise `appliedPromo` avec localStorage.
 * Enregistré via StoreModule.forFeature(..., { metaReducers: [...] }).
 */
export function promoStorageMetaReducer(
  reducer: ActionReducer<PromoState>
): ActionReducer<PromoState> {
  return (state, action) => {
    const nextState = reducer(state, action);
    // Persiste uniquement si `appliedPromo` a changé
    if (!state || nextState.appliedPromo !== state.appliedPromo) {
      savePromoToStorage(nextState.appliedPromo);
    }
    return nextState;
  };
}

// ── État initial (hydraté depuis localStorage si disponible) ──────────────────

const initialState: PromoState = {
  appliedPromo:     loadPromoFromStorage(),
  validationStatus: 'idle',
};

// ── Reducer ────────────────────────────────────────────────────────────────────

export function promoReducer(
  state: PromoState = initialState,
  action: Action
): PromoState {
  const promoAction = action as PromoActions;
  switch (promoAction.type) {

    case PromoActionTypes.VALIDATE_PROMO_CODE:
      // On passe en "loading" dès que l'utilisateur soumet le code.
      return { ...state, validationStatus: 'loading', appliedPromo: null };

    case PromoActionTypes.VALIDATE_PROMO_CODE_SUCCESS:
      return { appliedPromo: promoAction.payload.promo, validationStatus: 'valid' };

    case PromoActionTypes.VALIDATE_PROMO_CODE_FAILURE:
      return { appliedPromo: null, validationStatus: promoAction.payload.reason };

    case PromoActionTypes.CLEAR_PROMO_CODE:
      return { ...initialState, appliedPromo: null };

    default:
      return state;
  }
}
