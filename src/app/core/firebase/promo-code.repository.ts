import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Database, ref as dbRef, onValue, get, set, update, remove, push } from '@angular/fire/database';
import { PromoCode, PromoValidationResult } from '@shared/interfaces/promo-code.interfaces';

@Injectable({ providedIn: 'root' })
export class PromoCodeRepository {

  constructor(private db: Database) {}

  /** Écoute la liste complète des codes promo en temps réel. */
  watchAll(): Observable<PromoCode[]> {
    return new Observable(observer => {
      const r = dbRef(this.db, 'promoCodes');
      const unsub = onValue(r, (snap) => {
        const val = snap.val() as Record<string, any> | null;
        if (!val) { observer.next([]); return; }
        const list: PromoCode[] = Object.entries(val)
          .map(([id, data]) => ({ id, ...data } as PromoCode))
          .sort((a, b) => b.createdAt - a.createdAt);
        observer.next(list);
      }, err => observer.error(err));
      return () => unsub();
    });
  }

  async create(data: Omit<PromoCode, 'id'>): Promise<void> {
    const newRef = push(dbRef(this.db, 'promoCodes'));
    await set(newRef, data);
  }

  async update(id: string, data: Partial<Omit<PromoCode, 'id'>>): Promise<void> {
    await update(dbRef(this.db, `promoCodes/${id}`), data);
  }

  async delete(id: string): Promise<void> {
    await remove(dbRef(this.db, `promoCodes/${id}`));
  }

  /**
   * Valide un code saisi par l'utilisateur.
   * Retourne le PromoCode s'il est valide et dans sa période, null sinon.
   * Retourne aussi le motif d'échec ('not_found' | 'expired').
   */
  async validateCode(code: string): Promise<PromoValidationResult> {
    const snap = await get(dbRef(this.db, 'promoCodes'));
    const val = snap.val() as Record<string, any> | null;
    if (!val) return { promo: null, status: 'not_found' };

    const upper = code.trim().toUpperCase();
    const found = Object.entries(val).find(([, data]) => data.code === upper);
    if (!found) return { promo: null, status: 'not_found' };

    const [id, data] = found;
    const promo: PromoCode = { id, ...data };
    const now = Date.now();
    if (now < promo.startDate || now > promo.endDate) {
      return { promo, status: 'expired' };
    }
    return { promo, status: 'valid' };
  }

  /**
   * Retourne true s'il existe au moins un code promo actif (dans sa période).
   * Utilisé pour afficher le nudge dans les catégories.
   */
  hasAnyActivePromo(): Observable<boolean> {
    return new Observable(observer => {
      const r = dbRef(this.db, 'promoCodes');
      const unsub = onValue(r, (snap) => {
        const val = snap.val() as Record<string, any> | null;
        if (!val) { observer.next(false); return; }
        const now = Date.now();
        const hasActive = Object.values(val).some(
          (data: any) => now >= data.startDate && now <= data.endDate
        );
        observer.next(hasActive);
      }, () => observer.next(false));
      return () => unsub();
    });
  }
}
