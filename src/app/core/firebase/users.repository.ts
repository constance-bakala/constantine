import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Database, ref, onValue, get, set } from '@angular/fire/database';
import { ItemInfos } from '@shared/interfaces';

/**
 * UsersRepository
 * Seule classe autorisée à lire/écrire le nœud Firebase `users/`.
 * Appelé exclusivement depuis les NgRx Effects.
 */
@Injectable({ providedIn: 'root' })
export class UsersRepository {

  constructor(private db: Database) {}

  watchCommands(uid: string): Observable<ItemInfos[]> {
    return new Observable(observer => {
      const dbRef = ref(this.db, `users/${uid}/commends`);
      const unsubscribe = onValue(dbRef, (snap) => {
        const val = snap.val();
        if (val) {
          const firstCommend = Object.values(val)[0] as ItemInfos[];
          observer.next(firstCommend);
        }
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  getOrderStatus(uid: string): Observable<Record<string, any> | null> {
    return from(get(ref(this.db, `users/${uid}/orderStatus`))).pipe(
      map(snap => snap.val())
    );
  }

  saveBasket(uid: string, items: any[]): Promise<void> {
    return set(ref(this.db, `users/${uid}/basket`), items.length > 0 ? items : null);
  }

  getBasket(uid: string): Observable<any[] | null> {
    return from(get(ref(this.db, `users/${uid}/basket`))).pipe(
      map(snap => {
        const val = snap.val();
        if (!val) return null;
        const raw: any[] = Array.isArray(val) ? val : Object.values(val);
        return raw.filter(Boolean);
      })
    );
  }
}
