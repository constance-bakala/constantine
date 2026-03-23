import {
  Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy,
} from '@angular/core';
import { Database, ref, push, get, set, onValue, query, orderByChild, equalTo } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CatalogRepository } from '@app/core/firebase/catalog.repository';
import { selectAllCategories } from '@app/features/store/catalog/catalog.selectors';
import { CatalogCategory, CatalogItem } from '@shared/interfaces/catalog.interfaces';

// ── Types locaux ──────────────────────────────────────────────────────────────

interface ImportGroup {
  key: string;
  files: File[];
  previews: string[];
  coverIndex: number;
  priceXAF: number;
  stock: number;
}

interface EditingCell {
  itemId: string;
  field: 'stock' | 'price';
  value: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Groupe les fichiers par item selon leur nom (ex: mask-1-cover.webp → "mask-1"). */
function groupByName(files: File[]): ImportGroup[] {
  const map = new Map<string, File[]>();
  for (const f of files) {
    const noExt = f.name.replace(/\.[^.]+$/, '');
    const key = noExt
      .replace(/-cover$/i, '')
      .replace(/-[a-eA-E]$/i, '');
    map.set(key, [...(map.get(key) ?? []), f]);
  }
  return Array.from(map.entries()).map(([key, grpFiles]) => ({
    key,
    files: grpFiles,
    previews: grpFiles.map(f => URL.createObjectURL(f)),
    coverIndex: Math.max(0, grpFiles.findIndex(f => /cover/i.test(f.name))),
    priceXAF: 0,
    stock: 1,
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-admin-catalog',
  templateUrl: './admin-catalog.component.html',
  styleUrls: ['./admin-catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AdminCatalogComponent implements OnInit, OnDestroy {

  // ── State catégories
  categories: CatalogCategory[] = [];
  selectedCategory: CatalogCategory | null = null;
  categoryItems: CatalogItem[] = [];

  // ── Quill config
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  // ── Création catégorie
  showCreateForm = false;
  newPrefix = '';
  newTitle = '';
  newDescription = '';
  newDescriptionEn = '';
  descLang: 'fr' | 'en' = 'fr';
  creating = false;
  createError = '';

  // ── Édition description catégorie
  editingDesc = false;
  editDescFr = '';
  editDescEn = '';
  editDescLang: 'fr' | 'en' = 'fr';
  savingDesc = false;

  // ── Import images
  importGroups: ImportGroup[] = [];
  importing = false;
  importError = '';
  dragOver = false;

  // ── Pagination articles
  readonly pageSize = 10;
  currentPage = 1;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.categoryItems.length / this.pageSize));
  }

  get pagedItems(): CatalogItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.categoryItems.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.cdr.markForCheck();
  }

  // ── Édition inline items
  editing: EditingCell | null = null;
  saving = false;

  // ── Lightbox
  lightboxSrc: string | null = null;

  /** Stock disponible réel : stock/$reference/available (décrémenté par les commandes) */
  stockByRef: Record<string, number | undefined> = {};
  private stockUnsubscribe?: () => void;

  private subs = new Subscription();
  private itemsSub?: Subscription;

  constructor(
    private store: Store<any>,
    private repo: CatalogRepository,
    private cdr: ChangeDetectorRef,
    private db: Database,
  ) {}

  ngOnInit(): void {
    this.stockUnsubscribe = onValue(ref(this.db, 'stock'), (snap) => {
      const val = snap.val() as Record<string, any> | null;
      const map: Record<string, number> = {};
      if (val) {
        Object.entries(val).forEach(([refKey, data]) => {
          map[refKey] = data?.available ?? 0;
        });
      }
      this.stockByRef = map;
      this.cdr.markForCheck();
    });

    this.subs.add(
      this.store.select(selectAllCategories).subscribe(cats => {
        this.categories = cats;
        if (this.selectedCategory) {
          const updated = cats.find(c => c.prefix === this.selectedCategory!.prefix);
          if (updated) {
            this.selectedCategory = updated;
          } else {
            this.selectedCategory = null;
            this.categoryItems = [];
          }
        }
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.stockUnsubscribe?.();
    this.subs.unsubscribe();
    this.itemsSub?.unsubscribe();
    this.importGroups.forEach(g => g.previews.forEach(p => URL.revokeObjectURL(p)));
  }

  // ── Sélection catégorie ───────────────────────────────────────────────────

  selectCategory(cat: CatalogCategory): void {
    this.selectedCategory = cat;
    this.importGroups = [];
    this.importError = '';
    this.editing = null;
    this.currentPage = 1;
    this.itemsSub?.unsubscribe();
    this.itemsSub = this.repo.watchAllItemsByCategory(cat.prefix).subscribe(items => {
      this.categoryItems = items;
      // Initialise stock/$ref/available pour les articles sans nœud stock
      this.repo.ensureStockNodes(items).catch(e => console.error('[catalog] ensureStockNodes', e));
      this.cdr.markForCheck();
    });
  }

  backToList(): void {
    this.selectedCategory = null;
    this.categoryItems = [];
    this.itemsSub?.unsubscribe();
  }

  // ── Création catégorie ────────────────────────────────────────────────────

  openCreateForm(): void {
    this.showCreateForm = true;
    this.newPrefix = '';
    this.newTitle = '';
    this.newDescription = '';
    this.newDescriptionEn = '';
    this.descLang = 'fr';
    this.createError = '';
  }

  cancelCreate(): void {
    this.showCreateForm = false;
  }

  /** Caractères valides pour un segment d'URI : lettres ASCII minuscules, chiffres, tirets. */
  private static readonly URI_PATTERN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

  /** Normalise la valeur saisie vers un préfixe URI-safe. */
  sanitizePrefix(value: string): string {
    return value
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // supprime les accents (é→e, à→a…)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')                      // tout caractère invalide → tiret
      .replace(/-{2,}/g, '-')                             // tirets consécutifs → un seul
      .replace(/^-+|-+$/g, '');                           // supprime les tirets en début/fin
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
    if (!AdminCatalogComponent.URI_PATTERN.test(prefix)) {
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
      const description   = (this.newDescription   ?? '').trim();
      const descriptionEn = (this.newDescriptionEn ?? '').trim();
      await this.repo.createCategory(prefix, title, description, descriptionEn, relatedCategories);
      this.showCreateForm = false;
      this.newPrefix = '';
      this.newTitle = '';
      this.newDescription = '';
    } catch (e: any) {
      this.createError = e?.message ?? 'Erreur lors de la création.';
    } finally {
      this.creating = false;
      this.cdr.detectChanges();
    }
  }

  // ── Édition description catégorie ────────────────────────────────────────

  openEditDesc(cat: CatalogCategory): void {
    this.editDescFr   = cat.description   ?? '';
    this.editDescEn   = cat.descriptionEn ?? '';
    this.editDescLang = 'fr';
    this.editingDesc  = true;
  }

  cancelEditDesc(): void { this.editingDesc = false; }

  onDescChanged(lang: 'fr' | 'en', event: { html: string | null }): void {
    if (lang === 'fr') this.editDescFr = event.html ?? '';
    else               this.editDescEn = event.html ?? '';
    this.cdr.markForCheck();
  }

  onNewDescChanged(lang: 'fr' | 'en', event: { html: string | null }): void {
    if (lang === 'fr') this.newDescription   = event.html ?? '';
    else               this.newDescriptionEn = event.html ?? '';
    this.cdr.markForCheck();
  }

  async saveDesc(): Promise<void> {
    if (!this.selectedCategory) return;
    this.savingDesc = true;
    this.cdr.markForCheck();
    try {
      await this.repo.updateCategoryField(this.selectedCategory.prefix, 'description',   (this.editDescFr ?? '').trim());
      await this.repo.updateCategoryField(this.selectedCategory.prefix, 'descriptionEn', (this.editDescEn ?? '').trim());
      this.editingDesc = false;
    } catch (e) {
      console.error('[catalog] saveDesc', e);
    } finally {
      this.savingDesc = false;
      this.cdr.markForCheck();
    }
  }

  // ── Publier / Dépublier catégorie ─────────────────────────────────────────

  async toggleCategoryPublished(cat: CatalogCategory): Promise<void> {
    try {
      await this.repo.updateCategoryField(cat.prefix, 'published', !cat.published);
    } catch (e) {
      console.error('[catalog] toggleCategoryPublished', e);
    }
  }

  // ── Supprimer catégorie ───────────────────────────────────────────────────

  async deleteCategory(cat: CatalogCategory): Promise<void> {
    if (!confirm(`Supprimer la catégorie "${cat.title}" et tous ses articles ?`)) return;
    try {
      // Supprimer tous les items DB + leur Storage
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
      if (this.selectedCategory?.prefix === cat.prefix) this.backToList();
    } catch (e) {
      console.error('[catalog] deleteCategory', e);
    }
  }

  // ── Import images ─────────────────────────────────────────────────────────

  onDragOver(e: DragEvent): void { e.preventDefault(); this.dragOver = true; }
  onDragLeave(): void { this.dragOver = false; }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.dragOver = false;
    const files = Array.from(e.dataTransfer?.files ?? []).filter(f => f.type.startsWith('image/'));
    this.addFiles(files);
  }

  onFilePick(e: Event): void {
    const files = Array.from((e.target as HTMLInputElement).files ?? [])
      .filter(f => f.type.startsWith('image/'));
    this.addFiles(files);
    (e.target as HTMLInputElement).value = '';
  }

  private addFiles(files: File[]): void {
    const newGroups = groupByName(files);
    this.importGroups = [...this.importGroups, ...newGroups];
    this.cdr.markForCheck();
  }

  removeGroup(index: number): void {
    this.importGroups[index].previews.forEach(p => URL.revokeObjectURL(p));
    this.importGroups = this.importGroups.filter((_, i) => i !== index);
  }

  setCover(groupIndex: number, fileIndex: number): void {
    this.importGroups[groupIndex].coverIndex = fileIndex;
  }

  async importAll(): Promise<void> {
    if (!this.selectedCategory || this.importGroups.length === 0) return;
    this.importing = true;
    this.importError = '';
    const categoryId = this.selectedCategory.prefix;

    try {
      let nextN = await this.repo.getNextReferenceNumber(categoryId);

      for (const group of this.importGroups) {
        const itemRef = push(ref(this.db, 'catalog/items'));
        const itemId: string = itemRef.key!;
        const reference = `${categoryId.toUpperCase()}-${nextN++}`;
        const basePath = `catalog/${categoryId}/${itemId}`;

        // Upload toutes les images du groupe
        const urls: string[] = [];
        for (let i = 0; i < group.files.length; i++) {
          const file = group.files[i];
          const ext  = file.name.split('.').pop() ?? 'jpg';
          const path = `${basePath}/${i === group.coverIndex ? 'cover' : 'extra-' + i}.${ext}`;
          const url  = await this.repo.uploadFile(path, file);
          urls.push(url);
        }

        const coverUrl = urls[group.coverIndex] ?? urls[0];

        await this.repo.createItemInDb(itemId, {
          categoryId,
          reference,
          priceXAF:  group.priceXAF,
          stock:     group.stock,
          published: false,
          createdAt: Date.now(),
          coverUrl,
          images: urls,
        });
        // Initialise le stock disponible réel
        await set(ref(this.db, `stock/${reference}/available`), group.stock);
      }

      // Nettoyer les groupes importés
      this.importGroups.forEach(g => g.previews.forEach(p => URL.revokeObjectURL(p)));
      this.importGroups = [];
    } catch (e: any) {
      this.importError = e?.message ?? 'Erreur lors de l\'import.';
    } finally {
      this.importing = false;
      this.cdr.markForCheck();
    }
  }

  // ── Édition inline items ──────────────────────────────────────────────────

  startEdit(item: CatalogItem, field: 'stock' | 'price'): void {
    this.editing = {
      itemId: item.id,
      field,
      value: field === 'stock'
        ? (this.stockByRef[item.reference] ?? item.stock)
        : item.priceXAF,
    };
  }

  cancelEdit(): void { this.editing = null; }

  async saveEdit(): Promise<void> {
    if (!this.editing) return;
    this.saving = true;
    const { itemId, field, value } = this.editing;
    const dbField = field === 'price' ? 'priceXAF' : 'stock';
    const newValue = Math.max(0, Math.round(Number(value)));
    try {
      await this.repo.updateItemField(itemId, dbField, newValue);
      // Synchronise aussi stock/$reference/available
      if (field === 'stock') {
        const item = this.categoryItems.find(i => i.id === itemId);
        if (item?.reference) {
          await set(ref(this.db, `stock/${item.reference}/available`), newValue);
        }
      }
      this.editing = null;
    } catch (e) {
      console.error('[catalog] saveEdit', e);
    } finally {
      this.saving = false;
      this.cdr.markForCheck();
    }
  }

  async toggleItemPublished(item: CatalogItem): Promise<void> {
    try {
      await this.repo.updateItemField(item.id, 'published', !item.published);
    } catch (e) {
      console.error('[catalog] toggleItemPublished', e);
    }
  }

  async deleteItem(item: CatalogItem): Promise<void> {
    if (!confirm(`Supprimer l'article ${item.reference} ?`)) return;
    const categoryId = item.categoryId;
    try {
      await this.repo.deleteStorageFolder(`catalog/${categoryId}/${item.id}`);
      await this.repo.deleteItemFromDb(item.id);
    } catch (e) {
      console.error('[catalog] deleteItem', e);
    }
  }

  // ── Lightbox ──────────────────────────────────────────────────────────────

  openLightbox(src: string): void { this.lightboxSrc = src; }
  closeLightbox(): void { this.lightboxSrc = null; }

  // ── Sélection pour regroupement ───────────────────────────────────────────
  selectionMode = false;
  private _selectedImages = new Set<string>();

  /** Étape de confirmation : images candidates au regroupement */
  pendingMerge: { previews: string[]; files: File[]; coverIndex: number } | null = null;

  get selectedCount(): number { return this._selectedImages.size; }

  toggleSelectionMode(): void {
    this.selectionMode = !this.selectionMode;
    this._selectedImages.clear();
    this.pendingMerge = null;
    this.cdr.markForCheck();
  }

  imageKey(gi: number, fi: number): string { return `${gi}-${fi}`; }

  isImageSelected(gi: number, fi: number): boolean {
    return this._selectedImages.has(this.imageKey(gi, fi));
  }

  toggleImageSelection(gi: number, fi: number, event: Event): void {
    event.stopPropagation();
    const key = this.imageKey(gi, fi);
    if (this._selectedImages.has(key)) {
      this._selectedImages.delete(key);
    } else {
      this._selectedImages.add(key);
    }
    this.cdr.markForCheck();
  }

  /** Étape 1 : affiche le panneau de choix de couverture. */
  prepareMerge(): void {
    if (this._selectedImages.size === 0) return;

    const selected = Array.from(this._selectedImages).map(key => {
      const [gi, fi] = key.split('-').map(Number);
      return { gi, fi };
    });

    const newFiles    = selected.map(({ gi, fi }) => this.importGroups[gi].files[fi]);
    const newPreviews = selected.map(({ gi, fi }) => this.importGroups[gi].previews[fi]);

    this.pendingMerge = { files: newFiles, previews: newPreviews, coverIndex: 0 };
    this.cdr.markForCheck();
  }

  /** Étape 2 : confirme le regroupement avec la couverture choisie. */
  confirmMerge(): void {
    if (!this.pendingMerge) return;

    const selected = Array.from(this._selectedImages).map(key => {
      const [gi, fi] = key.split('-').map(Number);
      return { gi, fi };
    });

    const firstPrice = this.importGroups[selected[0].gi].priceXAF;
    const firstStock = this.importGroups[selected[0].gi].stock;

    const groupsCopy = this.importGroups.map(g => ({
      ...g,
      files:    [...g.files],
      previews: [...g.previews],
      coverIndex: g.coverIndex,
    }));

    const byGroup = new Map<number, number[]>();
    selected.forEach(({ gi, fi }) => {
      const arr = byGroup.get(gi) ?? [];
      arr.push(fi);
      byGroup.set(gi, arr);
    });

    byGroup.forEach((fis, gi) => {
      fis.sort((a, b) => b - a);
      fis.forEach(fi => {
        if (groupsCopy[gi].coverIndex > fi) {
          groupsCopy[gi].coverIndex = Math.max(0, groupsCopy[gi].coverIndex - 1);
        } else if (groupsCopy[gi].coverIndex === fi) {
          groupsCopy[gi].coverIndex = 0;
        }
        groupsCopy[gi].files.splice(fi, 1);
        groupsCopy[gi].previews.splice(fi, 1);
      });
    });

    const filtered = groupsCopy.filter(g => g.files.length > 0);

    const newGroup: ImportGroup = {
      key:        `groupe-${Date.now()}`,
      files:      this.pendingMerge.files,
      previews:   this.pendingMerge.previews,
      coverIndex: this.pendingMerge.coverIndex,
      priceXAF:   firstPrice,
      stock:      firstStock,
    };

    this.importGroups = [...filtered, newGroup];
    this._selectedImages.clear();
    this.pendingMerge = null;
    this.selectionMode = false;
    this.cdr.markForCheck();
  }

  // ── Helpers template ──────────────────────────────────────────────────────

  formatPrice(xaf: number): string {
    return xaf > 0 ? xaf.toLocaleString('fr-FR') + ' FCFA' : '—';
  }

  min(a: number, b: number): number { return Math.min(a, b); }

  trackByPrefix(_: number, cat: CatalogCategory): string { return cat.prefix; }
  trackById(_: number, item: CatalogItem): string { return item.id; }
  trackByIndex(i: number): number { return i; }
}

