import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PromoCodeService } from '@shared/services/promo-code.service';
import { PromoValidationResult } from '@shared/interfaces/promo-code.interfaces';
import {
  ActionValidatePromoCode,
  ActionValidatePromoCodeFailure,
  ActionValidatePromoCodeSuccess,
  PromoActionTypes,
} from './promo.actions';

@Injectable()
export class PromoEffects {

  constructor(
    private actions$: Actions,
    private promoCodeService: PromoCodeService,
  ) {}

  /**
   * Intercepte VALIDATE_PROMO_CODE, appelle le service (qui interroge Firebase),
   * puis dispatche SUCCESS ou FAILURE selon le résultat.
   *
   * switchMap annule tout appel en cours si l'utilisateur soumet un nouveau code
   * avant la réponse du précédent.
   */
  validatePromoCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PromoActionTypes.VALIDATE_PROMO_CODE),
      switchMap((action: ActionValidatePromoCode) =>
        this.promoCodeService.validateCode(action.payload.rawCode).pipe(
          map((result: PromoValidationResult) =>
            result.status === 'valid' && result.promo
              ? new ActionValidatePromoCodeSuccess({ promo: result.promo })
              : new ActionValidatePromoCodeFailure({ reason: result.status })
          ),
          // En cas d'erreur réseau imprévue, on traite comme "not_found".
          catchError(() => of(new ActionValidatePromoCodeFailure({ reason: 'not_found' })))
        )
      )
    )
  );
}
