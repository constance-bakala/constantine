import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Database, ref, onValue, get, set,
} from '@angular/fire/database';
import {
  Storage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject,
} from '@angular/fire/storage';
import { firstValueFrom } from 'rxjs';

export interface CarouselSlide {
  imageUrl: string;
  alt?: string;
  storagePath?: string; // chemin Firebase Storage pour suppression
}

// ── Deep merge (firebase values override static, missing keys kept from static)
export function mergeDeep(target: any, ...sources: any[]): any {
  for (const source of sources) {
    if (!source) continue;
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// ── Flatten nested object to dot-notation keys
export function flattenTranslations(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      result[fullKey] = val;
    } else if (val && typeof val === 'object') {
      Object.assign(result, flattenTranslations(val, fullKey));
    }
  }
  return result;
}

// ── Unflatten dot-notation keys back to nested object
export function unflattenTranslations(flat: Record<string, string>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, val] of Object.entries(flat)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = val;
  }
  return result;
}

@Injectable({ providedIn: 'root' })
export class AppConfigRepository {

  constructor(
    private db: Database,
    private storage: Storage,
    private http: HttpClient,
  ) {}

  // ── Translations ───────────────────────────────────────────────────────────

  getTranslationsOnce(lang: string): Promise<Record<string, any> | null> {
    return get(ref(this.db, `config/i18n/${lang}`)).then(snap => snap.val());
  }

  saveTranslations(lang: string, translations: Record<string, any>): Promise<void> {
    return set(ref(this.db, `config/i18n/${lang}`), translations);
  }

  /** Charge les traductions statiques JSON (source de vérité initiale). */
  loadStaticTranslations(lang: string): Promise<Record<string, any>> {
    return firstValueFrom(
      this.http.get<Record<string, any>>(`./assets/i18n/${lang}.json`).pipe(
        catchError(() => of({}))
      )
    );
  }

  // ── Carousel ──────────────────────────────────────────────────────────────

  watchCarousel(): Observable<CarouselSlide[]> {
    return new Observable(observer => {
      const unsubscribe = onValue(
        ref(this.db, 'config/carousel'),
        snap => {
          const val = snap.val();
          if (!val) { observer.next([]); return; }
          const slides: CarouselSlide[] = Array.isArray(val)
            ? val.filter(Boolean)
            : Object.values(val).filter(Boolean) as CarouselSlide[];
          observer.next(slides);
        },
        err => observer.error(err)
      );
      return () => unsubscribe();
    });
  }

  saveCarousel(slides: CarouselSlide[]): Promise<void> {
    return set(ref(this.db, 'config/carousel'), slides);
  }

  async uploadCarouselImage(file: File): Promise<CarouselSlide> {
    const path = `config/carousel/${Date.now()}_${file.name}`;
    const sRef = storageRef(this.storage, path);
    await uploadBytes(sRef, file);
    const imageUrl = await getDownloadURL(sRef);
    return { imageUrl, storagePath: path };
  }

  async deleteCarouselImage(slide: CarouselSlide): Promise<void> {
    if (slide.storagePath) {
      try {
        await deleteObject(storageRef(this.storage, slide.storagePath));
      } catch { /* ignoré si déjà supprimé */ }
    }
  }

  // ── App title ─────────────────────────────────────────────────────────────

  watchAppTitle(): Observable<{ fr: string; en: string }> {
    return new Observable(observer => {
      const unsubscribe = onValue(
        ref(this.db, 'config/appTitle'),
        snap => {
          const val = snap.val();
          observer.next(val ?? { fr: 'Délice Éternel', en: 'Délice Éternel' });
        },
        err => observer.error(err)
      );
      return () => unsubscribe();
    });
  }

  saveAppTitle(fr: string, en: string): Promise<void> {
    return set(ref(this.db, 'config/appTitle'), { fr, en });
  }
}
