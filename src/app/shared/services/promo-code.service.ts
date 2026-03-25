import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { PromoCodeRepository } from '@app/core/firebase/promo-code.repository';
import { PromoCode, PromoValidationResult } from '@shared/interfaces/promo-code.interfaces';
import { ItemInfos } from '@shared/interfaces';

@Injectable({ providedIn: 'root' })
export class PromoCodeService {

  constructor(private promoRepo: PromoCodeRepository) {}

  // ── Validation ─────────────────────────────────────────────────────────────

  /**
   * Valide un code saisi par l'utilisateur via Firebase.
   * Retourne un Observable pour être consommé directement par l'effect NgRx.
   */
  validateCode(rawCode: string): Observable<PromoValidationResult> {
    return from(this.promoRepo.validateCode(rawCode));
  }

  /**
   * Émet `true` dès qu'au moins un code promo est actif à l'instant présent.
   * Utilisé pour afficher le nudge dans les pages catégorie.
   */
  watchHasAnyActivePromo(): Observable<boolean> {
    return this.promoRepo.hasAnyActivePromo();
  }

  // ── Calcul de remise ───────────────────────────────────────────────────────

  /**
   * Calcule la remise totale (en EUR) applicable au panier.
   *
   * Seuls les articles dont `item.category === promo.categoryId` sont concernés.
   * Le montant est la somme des lignes : prix_unitaire_EUR × quantité × taux.
   *
   * @param promo         Code promo appliqué.
   * @param cartItems     Articles présents dans le panier.
   * @param getItemPrice  Fonction retournant le prix unitaire EUR de l'article.
   * @param getItemQty    Fonction retournant la quantité sélectionnée.
   * @returns             Montant de la remise en EUR (non arrondi).
   */
  calculateDiscountEur(
    promo: PromoCode,
    cartItems: ItemInfos[],
    getItemPrice: (item: ItemInfos) => number,
    getItemQty:   (item: ItemInfos) => number,
  ): number {
    const discountRate = promo.discountPercent / 100;

    return cartItems
      .filter(item => item.category === promo.categoryId)
      .reduce((totalDiscount, item) => {
        const lineTotal = getItemPrice(item) * getItemQty(item);
        return totalDiscount + lineTotal * discountRate;
      }, 0);
  }
}
