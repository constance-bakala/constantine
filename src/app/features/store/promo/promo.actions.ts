import { Action } from '@ngrx/store';
import { PromoCode, PromoValidationStatus } from '@shared/interfaces/promo-code.interfaces';

// ── Types d'action ─────────────────────────────────────────────────────────────

export enum PromoActionTypes {
  VALIDATE_PROMO_CODE         = '[PROMO] Validate promo code',
  VALIDATE_PROMO_CODE_SUCCESS = '[PROMO] Validate promo code success',
  VALIDATE_PROMO_CODE_FAILURE = '[PROMO] Validate promo code failure',
  CLEAR_PROMO_CODE            = '[PROMO] Clear promo code',
}

// ── Classes d'action ───────────────────────────────────────────────────────────

/** Déclenche la validation d'un code promo saisi par l'utilisateur. */
export class ActionValidatePromoCode implements Action {
  readonly type = PromoActionTypes.VALIDATE_PROMO_CODE;
  constructor(public payload: { rawCode: string }) {}
}

/** Le code est valide et dans sa période de validité. */
export class ActionValidatePromoCodeSuccess implements Action {
  readonly type = PromoActionTypes.VALIDATE_PROMO_CODE_SUCCESS;
  constructor(public payload: { promo: PromoCode }) {}
}

/** Le code est inconnu ou expiré. */
export class ActionValidatePromoCodeFailure implements Action {
  readonly type = PromoActionTypes.VALIDATE_PROMO_CODE_FAILURE;
  constructor(public payload: { reason: PromoValidationStatus }) {}
}

/** Retire le code promo appliqué (reset complet de l'état). */
export class ActionClearPromoCode implements Action {
  readonly type = PromoActionTypes.CLEAR_PROMO_CODE;
}

// ── Union type ─────────────────────────────────────────────────────────────────

export type PromoActions =
  | ActionValidatePromoCode
  | ActionValidatePromoCodeSuccess
  | ActionValidatePromoCodeFailure
  | ActionClearPromoCode;
