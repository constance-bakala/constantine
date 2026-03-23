import { Injectable, OnDestroy } from '@angular/core';
import { Database, ref, onValue, get } from '@angular/fire/database';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StockService implements OnDestroy {

  private stockByRef = new BehaviorSubject<Record<string, number>>({});
  readonly stockByRef$ = this.stockByRef.asObservable();

  private unsubscribe?: () => void;

  constructor(private db: Database) {
    this.unsubscribe = onValue(ref(this.db, 'stock'), (snap) => {
      const val = snap.val() as Record<string, any> | null;
      const map: Record<string, number> = {};
      if (val) {
        Object.entries(val).forEach(([refKey, data]) => {
          map[refKey] = data?.available ?? 0;
        });
      }
      this.stockByRef.next(map);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.();
  }

  /** Stock disponible depuis le cache temps réel. Retourne Infinity si le nœud n'existe pas. */
  getAvailable(reference: string): number {
    const val = this.stockByRef.getValue()[reference];
    return val === undefined ? Infinity : val;
  }

  isOutOfStock(reference: string): boolean {
    const val = this.stockByRef.getValue()[reference];
    return val !== undefined && val <= 0;
  }

  /**
   * Lit le stock directement depuis Firebase, met à jour le BehaviorSubject,
   * et retourne la valeur disponible.
   * À utiliser au clic sur "+" pour avoir la valeur la plus fraîche.
   */
  fetchAvailable(reference: string): Observable<number> {
    return from(get(ref(this.db, `stock/${reference}`))).pipe(
      map(snap => {
        const val = snap.val();
        const available: number | undefined = val?.available;
        const current = this.stockByRef.getValue();
        if (available !== undefined) {
          this.stockByRef.next({ ...current, [reference]: available });
        }
        return available === undefined ? Infinity : available;
      })
    );
  }
}
