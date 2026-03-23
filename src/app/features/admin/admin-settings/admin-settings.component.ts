import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {
  AppConfigRepository, CarouselSlide,
  flattenTranslations, unflattenTranslations,
} from '@app/core/firebase/app-config.repository';

export interface TranslationRow {
  key: string;
  fr: string;
  en: string;
  dirty: boolean;
}

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AdminSettingsComponent implements OnInit, OnDestroy {

  activeSection: 'carousel' | 'translations' | 'title' = 'carousel';

  // ── Carousel
  slides: CarouselSlide[] = [];
  carouselSaving = false;
  carouselDragOver = false;
  carouselUploading = false;
  carouselError = '';

  // ── Traductions
  translationRows: TranslationRow[] = [];
  translationsLoading = false;
  translationsSaving = false;
  translationsError = '';
  translationsSuccess = false;
  translationsFilter = '';

  // ── Titre
  appTitleFr = '';
  appTitleEn = '';
  titleSaving = false;
  titleSuccess = false;
  titleError = '';

  private subs = new Subscription();

  constructor(
    private configRepo: AppConfigRepository,
    private cdr: ChangeDetectorRef,
    private titleService: Title,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.configRepo.watchCarousel().subscribe(slides => {
        this.slides = [...slides];
        this.cdr.markForCheck();
      })
    );

    this.subs.add(
      this.configRepo.watchAppTitle().subscribe(t => {
        this.appTitleFr = t.fr ?? '';
        this.appTitleEn = t.en ?? '';
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Carousel ──────────────────────────────────────────────────────────────

  onCarouselDragOver(e: DragEvent): void { e.preventDefault(); this.carouselDragOver = true; }
  onCarouselDragLeave(): void { this.carouselDragOver = false; }

  onCarouselDrop(e: DragEvent): void {
    e.preventDefault();
    this.carouselDragOver = false;
    const files = Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'));
    this.uploadCarouselFiles(files);
  }

  onCarouselFilePick(e: Event): void {
    const files = Array.from((e.target as HTMLInputElement).files ?? []).filter(f => f.type.startsWith('image/'));
    (e.target as HTMLInputElement).value = '';
    this.uploadCarouselFiles(files);
  }

  private async uploadCarouselFiles(files: File[]): Promise<void> {
    if (!files.length) return;
    this.carouselUploading = true;
    this.carouselError = '';
    this.cdr.markForCheck();
    try {
      for (const file of files) {
        const slide = await this.configRepo.uploadCarouselImage(file);
        this.slides = [...this.slides, slide];
      }
      await this.configRepo.saveCarousel(this.slides);
    } catch (e: any) {
      this.carouselError = e?.message ?? 'Erreur lors de l\'upload.';
    } finally {
      this.carouselUploading = false;
      this.cdr.markForCheck();
    }
  }

  async removeSlide(index: number): Promise<void> {
    const slide = this.slides[index];
    this.carouselSaving = true;
    this.cdr.markForCheck();
    try {
      await this.configRepo.deleteCarouselImage(slide);
      this.slides = this.slides.filter((_, i) => i !== index);
      await this.configRepo.saveCarousel(this.slides);
    } catch (e: any) {
      this.carouselError = e?.message ?? 'Erreur lors de la suppression.';
    } finally {
      this.carouselSaving = false;
      this.cdr.markForCheck();
    }
  }

  moveSlide(index: number, direction: -1 | 1): void {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.slides.length) return;
    const arr = [...this.slides];
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    this.slides = arr;
    this.configRepo.saveCarousel(this.slides).catch(console.error);
  }

  // ── Traductions ───────────────────────────────────────────────────────────

  async loadTranslations(): Promise<void> {
    this.translationsLoading = true;
    this.translationsError = '';
    this.cdr.markForCheck();
    try {
      const [staticFr, staticEn, fbFr, fbEn] = await Promise.all([
        this.configRepo.loadStaticTranslations('fr'),
        this.configRepo.loadStaticTranslations('en'),
        this.configRepo.getTranslationsOnce('fr'),
        this.configRepo.getTranslationsOnce('en'),
      ]);

      const effectiveFr = fbFr ? { ...flattenTranslations(staticFr), ...flattenTranslations(fbFr) } : flattenTranslations(staticFr);
      const effectiveEn = fbEn ? { ...flattenTranslations(staticEn), ...flattenTranslations(fbEn) } : flattenTranslations(staticEn);
      const allKeys     = Array.from(new Set([...Object.keys(effectiveFr), ...Object.keys(effectiveEn)])).sort();

      this.translationRows = allKeys.map(key => ({
        key,
        fr:    effectiveFr[key] ?? '',
        en:    effectiveEn[key] ?? '',
        dirty: false,
      }));
    } catch (e: any) {
      this.translationsError = e?.message ?? 'Erreur de chargement.';
    } finally {
      this.translationsLoading = false;
      this.cdr.markForCheck();
    }
  }

  markDirty(row: TranslationRow): void { row.dirty = true; }

  get filteredRows(): TranslationRow[] {
    const q = this.translationsFilter.trim().toLowerCase();
    return q
      ? this.translationRows.filter(r =>
          r.key.toLowerCase().includes(q) ||
          r.fr.toLowerCase().includes(q)  ||
          r.en.toLowerCase().includes(q))
      : this.translationRows;
  }

  get dirtyCount(): number {
    return this.translationRows.filter(r => r.dirty).length;
  }

  async saveTranslations(): Promise<void> {
    this.translationsSaving = true;
    this.translationsError = '';
    this.translationsSuccess = false;
    this.cdr.markForCheck();
    try {
      const flatFr: Record<string, string> = {};
      const flatEn: Record<string, string> = {};
      for (const row of this.translationRows) {
        flatFr[row.key] = row.fr;
        flatEn[row.key] = row.en;
        row.dirty = false;
      }
      await Promise.all([
        this.configRepo.saveTranslations('fr', unflattenTranslations(flatFr)),
        this.configRepo.saveTranslations('en', unflattenTranslations(flatEn)),
      ]);
      this.translationsSuccess = true;
      setTimeout(() => { this.translationsSuccess = false; this.cdr.markForCheck(); }, 3000);
    } catch (e: any) {
      this.translationsError = e?.message ?? 'Erreur lors de la sauvegarde.';
    } finally {
      this.translationsSaving = false;
      this.cdr.markForCheck();
    }
  }

  // ── Titre ─────────────────────────────────────────────────────────────────

  async saveTitle(): Promise<void> {
    this.titleSaving = true;
    this.titleSuccess = false;
    this.titleError = '';
    this.cdr.markForCheck();
    try {
      const fr = this.appTitleFr.trim();
      const en = this.appTitleEn.trim();
      await this.configRepo.saveAppTitle(fr, en);
      const lang = this.translate.currentLang ?? 'fr';
      const newTitle = lang === 'en' ? en : fr;
      if (newTitle) this.titleService.setTitle(newTitle);
      this.titleSuccess = true;
      this.cdr.markForCheck();
      setTimeout(() => { this.titleSuccess = false; this.cdr.markForCheck(); }, 3000);
    } catch (e: any) {
      this.titleError = e?.message ?? 'Erreur lors de la sauvegarde.';
      console.error('[settings] saveTitle', e);
    } finally {
      this.titleSaving = false;
      this.cdr.markForCheck();
    }
  }

  trackByKey(_: number, row: TranslationRow): string { return row.key; }
  trackByIndex(i: number): number { return i; }
}
