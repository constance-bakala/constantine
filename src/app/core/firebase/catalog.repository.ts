import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Database, ref as dbRef, onValue, get, set, update, remove,
  query, orderByChild, equalTo,
} from '@angular/fire/database';
import {
  Storage, ref, uploadBytes, getDownloadURL, deleteObject, listAll,
} from '@angular/fire/storage';
import { CatalogCategory, CatalogItem } from '@shared/interfaces/catalog.interfaces';

@Injectable({ providedIn: 'root' })
export class CatalogRepository {

  constructor(private db: Database, private storage: Storage) {}

  // ── config/ — Configuration globale ──────────────────────────────────────

  /** Observe le taux de TVA stocké dans config/tvaRate (0 = pas de TVA). */
  watchTvaRate(): Observable<number> {
    return new Observable(observer => {
      const configRef = dbRef(this.db, 'config/tvaRate');
      const unsubscribe = onValue(configRef, (snap) => {
        const val = snap.val();
        observer.next(typeof val === 'number' ? val : 0);
      }, () => observer.next(0));
      return () => unsubscribe();
    });
  }

  // ── Legacy prices/ ────────────────────────────────────────────────────────

  watchPriceOverrides(): Observable<Record<string, number>> {
    return new Observable(observer => {
      const pricesRef = dbRef(this.db, 'prices');
      const unsubscribe = onValue(pricesRef, (snap) => {
        const val = snap.val() as Record<string, any> | null;
        const overrides: Record<string, number> = {};
        if (val) {
          Object.entries(val).forEach(([key, data]) => {
            if (data?.priceXAF != null) overrides[key] = data.priceXAF;
          });
        }
        observer.next(overrides);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  // ── catalog/categories/ — Lectures ───────────────────────────────────────

  watchCategories(): Observable<CatalogCategory[]> {
    return new Observable(observer => {
      const categoriesRef = dbRef(this.db, 'catalog/categories');
      const unsubscribe = onValue(categoriesRef, (snap) => {
        const val = snap.val() as Record<string, any> | null;
        if (!val) { observer.next([]); return; }
        const categories: CatalogCategory[] = Object.entries(val)
          .map(([prefix, data]) => ({ prefix, ...data } as CatalogCategory))
          .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
        observer.next(categories);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  watchAllItemsByCategory(categoryId: string): Observable<CatalogItem[]> {
    return new Observable(observer => {
      const itemsQuery = query(
        dbRef(this.db, 'catalog/items'),
        orderByChild('categoryId'),
        equalTo(categoryId)
      );
      const unsubscribe = onValue(itemsQuery, (snap) => {
        const val = snap.val() as Record<string, any> | null;
        if (!val) { observer.next([]); return; }
        const items: CatalogItem[] = Object.entries(val)
          .map(([id, data]) => ({ id, ...data } as CatalogItem))
          .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
        observer.next(items);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  watchPublishedItemsByCategory(categoryId: string): Observable<CatalogItem[]> {
    return this.watchAllItemsByCategory(categoryId).pipe(
      map(items => items.filter(i => i.published))
    );
  }

  getCategoryOnce(prefix: string): Observable<CatalogCategory | null> {
    return new Observable(observer => {
      get(dbRef(this.db, `catalog/categories/${prefix}`))
        .then(snap => {
          const val = snap.val();
          observer.next(val ? ({ prefix, ...val } as CatalogCategory) : null);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  // ── catalog/categories/ — Écritures admin ────────────────────────────────

  async createCategory(
    prefix: string,
    title: string,
    description: string,
    descriptionEn: string,
    relatedCategories: string[]
  ): Promise<void> {
    await set(dbRef(this.db, `catalog/categories/${prefix}`), {
      prefix, title, description, descriptionEn, published: false,
      createdAt: Date.now(), relatedCategories,
    });
  }

  async updateCategoryField(prefix: string, field: string, value: any): Promise<void> {
    await update(dbRef(this.db, `catalog/categories/${prefix}`), { [field]: value });
  }

  async deleteCategory(prefix: string): Promise<void> {
    await remove(dbRef(this.db, `catalog/categories/${prefix}`));
  }

  // ── catalog/items/ — Écritures admin ─────────────────────────────────────

  async createItemInDb(itemId: string, data: Omit<CatalogItem, 'id'>): Promise<void> {
    await set(dbRef(this.db, `catalog/items/${itemId}`), data);
  }

  async updateItemField(itemId: string, field: string, value: any): Promise<void> {
    await update(dbRef(this.db, `catalog/items/${itemId}`), { [field]: value });
  }

  async deleteItemFromDb(itemId: string): Promise<void> {
    await remove(dbRef(this.db, `catalog/items/${itemId}`));
  }

  /**
   * Pour les articles qui n'ont pas encore de nœud stock/ Firebase
   * (importés avant l'initialisation automatique), crée le nœud
   * stock/$reference/available avec le stock du catalogue.
   * N'écrase jamais un nœud existant.
   */
  async ensureStockNodes(items: CatalogItem[]): Promise<void> {
    if (!items.length) return;
    const stockSnap = await get(dbRef(this.db, 'stock'));
    const existing = (stockSnap.val() ?? {}) as Record<string, any>;
    const writes: Promise<void>[] = [];
    for (const item of items) {
      if (!(item.reference in existing) && item.stock > 0) {
        writes.push(set(dbRef(this.db, `stock/${item.reference}/available`), item.stock));
      }
    }
    if (writes.length) await Promise.all(writes);
  }

  async getNextReferenceNumber(categoryId: string): Promise<number> {
    const snap = await get(
      query(dbRef(this.db, 'catalog/items'), orderByChild('categoryId'), equalTo(categoryId))
    );
    const val = snap.val() as Record<string, any> | null;
    if (!val) return 1;
    const max = Object.values(val).reduce((m: number, item: any) => {
      const match = String(item.reference ?? '').match(/-(\d+)$/);
      const n = match ? parseInt(match[1], 10) : 0;
      return Math.max(m, n);
    }, 0);
    return max + 1;
  }

  // ── Firebase Storage ──────────────────────────────────────────────────────

  async uploadFile(path: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async deleteFile(path: string): Promise<void> {
    await deleteObject(ref(this.storage, path));
  }

  async deleteStorageFolder(folderPath: string): Promise<void> {
    const folderRef = ref(this.storage, folderPath);
    try {
      const list = await listAll(folderRef);
      await Promise.all(list.items.map(item => deleteObject(item)));
    } catch {
      // Dossier inexistant ou déjà vide
    }
  }
}
