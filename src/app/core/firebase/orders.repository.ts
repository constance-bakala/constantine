import { Injectable } from '@angular/core';

/**
 * OrdersRepository
 * Seule classe autorisée à lire/écrire le nœud Firebase `orders/`.
 * Appelé exclusivement depuis les NgRx Effects.
 *
 * Phase 2 : stub — le composant AdminDashboard accède encore directement à orders/
 *           via firebase.database() et les Firebase Functions.
 * Phase 4 : ce repository sera complété lors de la refacto de l'UI admin catalogue.
 */
@Injectable({ providedIn: 'root' })
export class OrdersRepository {
  // TODO Phase 4 : watchOrders(), updateOrderStatus(), resendPaymentEmail()
}
