import {
  Component, OnInit, OnDestroy, ChangeDetectorRef,
  ChangeDetectionStrategy, Output, EventEmitter,
} from '@angular/core';
import { Database, ref, get, query, orderByChild, equalTo } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CatalogRepository } from '@app/core/firebase/catalog.repository';
import { selectAllCategories } from '@app/features/store/catalog/catalog.selectors';
import { CatalogCategory } from '@shared/interfaces/catalog.interfaces';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AdminCategoryListComponent implements OnInit, OnDestroy {

  @Output() categorySelected = new EventEmitter<CatalogCategory>();

  categories: CatalogCategory[] = [];

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  showCreateForm = false;
  newPrefix = '';
  newTitle = '';
  newTitleEn = '';
  newDescription = '';
  newDescriptionEn = '';
  descLang: 'fr' | 'en' = 'fr';
  creating = false;
  createError = '';

  private static readonly URI_PATTERN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

  private subs = new Subscription();

  constructor(
    private store: Store<any>,
    private repo: CatalogRepository,
    private db: Database,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.store.select(selectAllCategories).subscribe(cats => {
        this.categories = cats;
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openCreateForm(): void {
    this.showCreateForm = true;
    this.newPrefix = '';
    this.newTitle = '';
    this.newTitleEn = '';
    this.newDescription = '';
    this.newDescriptionEn = '';
    this.descLang = 'fr';
    this.createError = '';
  }

  cancelCreate(): void {
    this.showCreateForm = false;
  }

  sanitizePrefix(value: string): string {
    return value
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  onPrefixInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitized = this.sanitizePrefix(input.value);
    if (input.value !== sanitized) {
      this.newPrefix = sanitized;
      input.value = sanitized;
    }
  }

  async submitCreateCategory(): Promise<void> {
    const prefix = this.sanitizePrefix(this.newPrefix.trim());
    const title  = this.newTitle.trim();

    if (!prefix) { this.createError = 'Le préfixe est obligatoire.'; this.cdr.markForCheck(); return; }
    if (!title)  { this.createError = 'Le titre est obligatoire.'; this.cdr.markForCheck(); return; }
    if (!AdminCategoryListComponent.URI_PATTERN.test(prefix)) {
      this.createError = 'Le préfixe doit contenir uniquement des lettres (a-z), chiffres (0-9) et tirets, sans commencer ni finir par un tiret.';
      this.cdr.markForCheck();
      return;
    }
    if (this.categories.find(c => c.prefix === prefix)) {
      this.createError = `Le préfixe "${prefix}" existe déjà.`;
      this.cdr.markForCheck();
      return;
    }

    this.creating = true;
    this.createError = '';
    this.cdr.markForCheck();
    try {
      const relatedCategories = this.categories
        .filter(c => c.published)
        .map(c => c.prefix);
      await this.repo.createCategory(
        prefix,
        title,
        (this.newTitleEn ?? '').trim(),
        (this.newDescription ?? '').trim(),
        (this.newDescriptionEn ?? '').trim(),
        relatedCategories,
      );
      this.showCreateForm = false;
      this.newPrefix = '';
      this.newTitle = '';
      this.newTitleEn = '';
      this.newDescription = '';
    } catch (e: any) {
      this.createError = e?.message ?? 'Erreur lors de la création.';
    } finally {
      this.creating = false;
      this.cdr.detectChanges();
    }
  }

  onNewDescChanged(lang: 'fr' | 'en', event: { html: string | null }): void {
    if (lang === 'fr') this.newDescription   = event.html ?? '';
    else               this.newDescriptionEn = event.html ?? '';
    this.cdr.markForCheck();
  }

  async toggleCategoryPublished(cat: CatalogCategory): Promise<void> {
    try {
      await this.repo.updateCategoryField(cat.prefix, 'published', !cat.published);
    } catch (e) {
      console.error('[catalog] toggleCategoryPublished', e);
    }
  }

  async deleteCategory(cat: CatalogCategory): Promise<void> {
    if (!confirm(`Supprimer la catégorie "${cat.title}" et tous ses articles ?`)) return;
    try {
      const snap = await get(query(ref(this.db, 'catalog/items'), orderByChild('categoryId'), equalTo(cat.prefix)));
      const val = snap.val() as Record<string, any> | null;
      if (val) {
        for (const [id] of Object.entries(val)) {
          await this.repo.deleteStorageFolder(`catalog/${cat.prefix}/${id}`);
          await this.repo.deleteItemFromDb(id);
        }
      }
      await this.repo.deleteStorageFolder(`catalog/${cat.prefix}`);
      await this.repo.deleteCategory(cat.prefix);
    } catch (e) {
      console.error('[catalog] deleteCategory', e);
    }
  }

  trackByPrefix(_: number, cat: CatalogCategory): string { return cat.prefix; }
}
