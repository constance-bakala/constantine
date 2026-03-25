import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PromoCodeRepository } from '@app/core/firebase/promo-code.repository';
import { CatalogRepository } from '@app/core/firebase/catalog.repository';
import { PromoCode } from '@shared/interfaces/promo-code.interfaces';
import { CatalogCategory } from '@shared/interfaces/catalog.interfaces';

/** Statut calculé à l'affichage en fonction des dates. */
type PromoDisplayStatus = 'upcoming' | 'active' | 'expired';

@Component({
  selector: 'app-admin-promo-codes',
  templateUrl: './admin-promo-codes.component.html',
  styleUrls: ['./admin-promo-codes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AdminPromoCodesComponent implements OnInit, OnDestroy {

  promoCodes: PromoCode[] = [];
  publishedCategories: CatalogCategory[] = [];
  isSaving = false;
  pendingDeleteId: string | null = null;

  newPromoForm = {
    code:            '',
    discountPercent: 10,
    categoryId:      '',
    startDate:       '',
    endDate:         '',
  };

  private subs = new Subscription();

  constructor(
    private promoRepo: PromoCodeRepository,
    private catalogRepo: CatalogRepository,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Écoute la liste des codes promo en temps réel
    this.subs.add(
      this.promoRepo.watchAll().subscribe(list => {
        this.promoCodes = list;
        this.cdr.markForCheck();
      })
    );

    // Charge les catégories publiées pour le select du formulaire
    this.subs.add(
      this.catalogRepo.watchCategories().subscribe(categories => {
        this.publishedCategories = categories.filter(c => c.published);
        // Pré-sélectionne la première catégorie si le champ est vide
        if (!this.newPromoForm.categoryId && this.publishedCategories.length) {
          this.newPromoForm.categoryId = this.publishedCategories[0].prefix;
        }
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Validation du formulaire ───────────────────────────────────────────────

  get isFormValid(): boolean {
    const { code, discountPercent, categoryId, startDate, endDate } = this.newPromoForm;
    return (
      code.trim().length >= 3 &&
      discountPercent >= 1 && discountPercent <= 100 &&
      !!categoryId &&
      !!startDate && !!endDate &&
      new Date(startDate) <= new Date(endDate)
    );
  }

  // ── Actions CRUD ───────────────────────────────────────────────────────────

  /** Crée le code promo dans Firebase et réinitialise le formulaire. */
  async saveNewPromo(): Promise<void> {
    if (!this.isFormValid || this.isSaving) return;
    this.isSaving = true;
    try {
      await this.promoRepo.create({
        code:            this.newPromoForm.code.trim().toUpperCase(),
        discountPercent: this.newPromoForm.discountPercent,
        categoryId:      this.newPromoForm.categoryId,
        // La date de fin est inclusive : on force 23:59:59 pour couvrir toute la journée
        startDate: new Date(this.newPromoForm.startDate).getTime(),
        endDate:   new Date(this.newPromoForm.endDate + 'T23:59:59').getTime(),
        createdAt: Date.now(),
      });
      this.newPromoForm = {
        code: '', discountPercent: 10,
        categoryId: this.newPromoForm.categoryId,
        startDate: '', endDate: '',
      };
    } finally {
      this.isSaving = false;
      this.cdr.markForCheck();
    }
  }

  requestDelete(promoId: string): void {
    this.pendingDeleteId = promoId;
    this.cdr.markForCheck();
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
    this.cdr.markForCheck();
  }

  async confirmDelete(promoId: string): Promise<void> {
    await this.promoRepo.delete(promoId);
    this.pendingDeleteId = null;
    this.cdr.markForCheck();
  }

  // ── Helpers d'affichage ────────────────────────────────────────────────────

  getPromoDisplayStatus(promo: PromoCode): PromoDisplayStatus {
    const now = Date.now();
    if (now < promo.startDate) return 'upcoming';
    if (now > promo.endDate)   return 'expired';
    return 'active';
  }

  getCategoryTitle(categoryId: string): string {
    return this.publishedCategories.find(c => c.prefix === categoryId)?.title ?? categoryId;
  }
}
