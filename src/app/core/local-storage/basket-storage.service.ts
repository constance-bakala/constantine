import { Injectable } from '@angular/core';

const BASKET_KEY   = 'delice-basket';
const CLEARED_FLAG = 'basketCleared';

export interface BasketSavedEntry {
  reference: string;
  category: string;
  index: number;
  selected: boolean;
  basketInfos: { selectedQuantity: number; selectedSize: string; selectedModel: string };
}

/**
 * BasketStorageService
 * Seule classe autorisée à lire/écrire les clés localStorage du panier.
 */
@Injectable({ providedIn: 'root' })
export class BasketStorageService {

  /** Renvoie true si le flag "panier effacé" est présent (et le consomme). */
  consumeClearedFlag(): boolean {
    const flagged = !!localStorage.getItem(CLEARED_FLAG);
    if (flagged) {
      localStorage.removeItem(CLEARED_FLAG);
      localStorage.removeItem(BASKET_KEY);
    }
    return flagged;
  }

  /** Lit les articles sauvegardés ; renvoie [] si absent ou invalide. */
  loadBasket(): BasketSavedEntry[] {
    try {
      const raw = localStorage.getItem(BASKET_KEY);
      return raw ? (JSON.parse(raw) as BasketSavedEntry[]) : [];
    } catch {
      return [];
    }
  }

  /** Persiste les articles du panier. */
  saveBasket(entries: BasketSavedEntry[]): void {
    localStorage.setItem(BASKET_KEY, JSON.stringify(entries));
  }

  /** Supprime les articles du panier. */
  clearBasket(): void {
    localStorage.removeItem(BASKET_KEY);
  }

  /**
   * Marque le panier comme "effacé côté serveur" :
   * supprime les articles et pose le flag pour que ItemsEffects
   * ne restaure pas l'ancien panier au prochain démarrage.
   */
  markBasketCleared(): void {
    localStorage.removeItem(BASKET_KEY);
    localStorage.setItem(CLEARED_FLAG, '1');
  }
}
