import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  AppConfigRepository,
  normalizeHexColor,
  SHOP_DEFAULTS,
  ShopConfig,
  THEME_DEFAULTS,
} from '@app/core/firebase/app-config.repository';
import { ThemeService } from '@shared/services/theme.service';
import { environment } from '../../../../environments/environment';

export const GOOGLE_FONTS: { label: string; value: string }[] = [
  { label: 'Roboto (défaut)',    value: 'Roboto, "Helvetica Neue", sans-serif' },
  { label: 'Playfair Display',  value: '"Playfair Display", Georgia, serif' },
  { label: 'Lato',              value: 'Lato, sans-serif' },
  { label: 'Montserrat',        value: 'Montserrat, sans-serif' },
  { label: 'Open Sans',         value: '"Open Sans", sans-serif' },
  { label: 'Raleway',           value: 'Raleway, sans-serif' },
  { label: 'Poppins',           value: 'Poppins, sans-serif' },
  { label: 'Merriweather',      value: 'Merriweather, Georgia, serif' },
];

@Component({
  selector: 'app-admin-setup-wizard',
  templateUrl: './admin-setup-wizard.component.html',
  styleUrls: ['./admin-setup-wizard.component.scss'],
  standalone: false,
})
export class AdminSetupWizardComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper!: MatStepper;

  readonly fonts = GOOGLE_FONTS;

  // ── Formulaires ────────────────────────────────────────────────────────────
  identityForm!: FormGroup;
  appearanceForm!: FormGroup;
  contactForm!: FormGroup;
  domainForm!: FormGroup;

  /** Dépôt type après création client (remplacer VOTRE_DEPOT par le nom du dépôt). */
  readonly cloneRepoPlaceholder = 'up2date-it/VOTRE_DEPOT';

  // ── Upload ─────────────────────────────────────────────────────────────────
  logoPreview    = SHOP_DEFAULTS.logoUrl;
  faviconPreview = '';
  uploadingLogo    = false;
  uploadingFavicon = false;
  uploadError      = '';

  // ── État global ────────────────────────────────────────────────────────────
  saving = false;
  error  = '';
  copyDone              = false;
  copyCloneDone         = false;
  copyDevFirebaseDone   = false;
  copyDevFirebasercDone = false;

  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private configRepo: AppConfigRepository,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.identityForm = this.fb.group({
      name:      [SHOP_DEFAULTS.name, Validators.required],
      tagline:   [SHOP_DEFAULTS.tagline],
      logoUrl:   [SHOP_DEFAULTS.logoUrl],
      faviconUrl:[''],
    });

    this.appearanceForm = this.fb.group({
      primaryColor:   [THEME_DEFAULTS.primaryColor, Validators.required],
      secondaryColor: [THEME_DEFAULTS.secondaryColor],
      fontFamily:     [THEME_DEFAULTS.fontFamily, Validators.required],
    });

    this.contactForm = this.fb.group({
      whatsapp: [SHOP_DEFAULTS.whatsapp],
      email:    [SHOP_DEFAULTS.email],
      address:  [SHOP_DEFAULTS.address],
    });

    this.domainForm = this.fb.group({
      domain: [''],
    });

    // Preview live : applique couleurs + police dès que le formulaire change
    this.subs.add(
      this.appearanceForm.valueChanges.subscribe(v => {
        this.themeService.preview({
          primaryColor:   v.primaryColor,
          secondaryColor: v.secondaryColor,
          fontFamily:     v.fontFamily,
        });
      })
    );

    // Précharger la config existante
    this.subs.add(
      this.configRepo.watchShop().pipe(take(1)).subscribe(shop => {
        this.identityForm.patchValue({
          name:       shop.name,
          tagline:    shop.tagline,
          logoUrl:    shop.logoUrl,
          /** Sinon le champ reste vide et la sauvegarde écrase une favicon déjà en base. */
          faviconUrl: shop.faviconUrl ?? '',
        });
        this.contactForm.patchValue({
          whatsapp: shop.whatsapp,
          email:    shop.email,
          address:  shop.address,
        });
        if (shop.logoUrl) this.logoPreview = shop.logoUrl;
        if (shop.faviconUrl) this.faviconPreview = shop.faviconUrl;
      })
    );

    this.subs.add(
      this.configRepo.watchTheme().pipe(take(1)).subscribe(theme => {
        this.appearanceForm.patchValue({
          primaryColor:   theme.primaryColor,
          secondaryColor: theme.secondaryColor,
          fontFamily:     theme.fontFamily,
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Uploads ────────────────────────────────────────────────────────────────

  async onLogoFile(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingLogo = true;
    this.uploadError = '';
    try {
      const url = await this.configRepo.uploadLogo(file);
      this.logoPreview = url;
      this.identityForm.patchValue({ logoUrl: url });
    } catch (e: any) {
      this.uploadError = e?.message ?? 'Erreur lors de l\'upload du logo.';
    } finally {
      this.uploadingLogo = false;
    }
  }

  async onFaviconFile(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingFavicon = true;
    this.uploadError = '';
    try {
      const url = await this.configRepo.uploadFavicon(file);
      this.faviconPreview = url;
      this.identityForm.patchValue({ faviconUrl: url });
    } catch (e: any) {
      this.uploadError = e?.message ?? 'Erreur lors de l\'upload du favicon.';
    } finally {
      this.uploadingFavicon = false;
    }
  }

  // ── Sauvegardes par étape ──────────────────────────────────────────────────

  async saveIdentity(): Promise<void> {
    if (this.identityForm.invalid) return;
    await this.run(() => {
      const v = this.identityForm.value;
      const payload: Partial<ShopConfig> = {
        name:    v.name,
        tagline: v.tagline ?? '',
        logoUrl: (v.logoUrl ?? '').trim() || SHOP_DEFAULTS.logoUrl,
      };
      const fav = (v.faviconUrl ?? '').trim();
      /** Ne pas envoyer une chaîne vide : `update` écraserait une favicon déjà stockée. */
      if (fav) {
        payload.faviconUrl = fav;
      }
      return this.configRepo.saveShop(payload);
    });
  }

  async saveAppearance(): Promise<void> {
    await this.run(() => {
      const v = this.appearanceForm.value;
      const primary = normalizeHexColor(v.primaryColor, THEME_DEFAULTS.primaryColor);
      const secondary = normalizeHexColor(v.secondaryColor, THEME_DEFAULTS.secondaryColor);
      return this.configRepo.saveTheme({
        primaryColor:   primary,
        primaryDark:    this.darken(primary),
        secondaryColor: secondary,
        fontFamily:     v.fontFamily,
      });
    });
  }

  async saveContact(): Promise<void> {
    await this.run(() => {
      const v = this.contactForm.value;
      return this.configRepo.saveShop({ whatsapp: v.whatsapp, email: v.email, address: v.address });
    });
  }

  skipDomain(): void {
    this.stepper.next();
    this.stepper.next();
  }

  configureDomain(): void {
    // La configuration du domaine Firebase Hosting nécessite une Cloud Function
    // avec les permissions Firebase Management API. L'UI affiche les instructions.
    this.stepper.next();
  }

  // ── Copie commandes ────────────────────────────────────────────────────────

  copyDevFirebaseConfig(): void {
    navigator.clipboard.writeText(this.devLocalFirebaseConfigSnippet).then(() => {
      this.copyDevFirebaseDone = true;
      setTimeout(() => { this.copyDevFirebaseDone = false; }, 2000);
    }).catch(() => {});
  }

  copyDevFirebaserc(): void {
    navigator.clipboard.writeText(this.devLocalFirebasercSnippet).then(() => {
      this.copyDevFirebasercDone = true;
      setTimeout(() => { this.copyDevFirebasercDone = false; }, 2000);
    }).catch(() => {});
  }

  copyClone(): void {
    navigator.clipboard.writeText(this.cloneCommandsText).then(() => {
      this.copyCloneDone = true;
      setTimeout(() => { this.copyCloneDone = false; }, 2000);
    }).catch(() => {});
  }

  copyCommands(): void {
    navigator.clipboard.writeText(this.deployCommandsText).then(() => {
      this.copyDone = true;
      setTimeout(() => { this.copyDone = false; }, 2000);
    }).catch(() => {});
  }

  // ── Getters template ───────────────────────────────────────────────────────

  get domainControl(): FormControl {
    return this.domainForm.get('domain') as FormControl;
  }

  /** Valeurs du build actuel (déjà injectées en prod) — utiles pour recopier en local. */
  get devLocalFirebaseConfigSnippet(): string {
    const c = environment.firebaseConfig;
    const esc = (s: string) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `export const environment = {
  // ...
  firebaseConfig: {
    apiKey:            "${esc(c.apiKey)}",
    authDomain:        "${esc(c.authDomain)}",
    databaseURL:       "${esc(c.databaseURL)}",
    projectId:         "${esc(c.projectId)}",
    storageBucket:     "${esc(c.storageBucket)}",
    messagingSenderId: "${esc(c.messagingSenderId)}",
    appId:             "${esc(c.appId)}",
    measurementId:     "${esc(c.measurementId)}",
  },
};`;
  }

  get devLocalFirebasercSnippet(): string {
    const pid = environment.firebaseConfig.projectId || 'MON_PROJECT_ID';
    return `{\n  "projects": {\n    "default": "${pid}"\n  }\n}`;
  }

  /** Enregistrement TXT Firebase Hosting (domaine personnalisé). */
  get dnsHostingSiteTxt(): string {
    const pid = (environment.firebaseConfig.projectId ?? '').trim() || 'MON_PROJECT_ID';
    return `hosting-site=${pid}`;
  }

  get cloneCommandsText(): string {
    const repo = this.cloneRepoPlaceholder;
    return `git clone https://github.com/${repo}.git\ncd ${repo.split('/')[1] ?? 'VOTRE_DEPOT'}\nnpm install --legacy-peer-deps`;
  }

  get deployCommandsText(): string {
    return 'ng build --configuration production\nfirebase deploy';
  }

  get selectedFontLabel(): string {
    const val = this.appearanceForm.get('fontFamily')?.value ?? '';
    return this.fonts.find(f => f.value === val)?.label ?? val;
  }

  // ── Privé ──────────────────────────────────────────────────────────────────

  private async run(action: () => Promise<void>): Promise<void> {
    this.saving = true;
    this.error = '';
    try {
      await action();
      this.stepper.next();
    } catch (e: any) {
      this.error = e?.message ?? 'Erreur de sauvegarde.';
    } finally {
      this.saving = false;
    }
  }

  private darken(hex: string): string {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (n >> 16) - 40);
    const g = Math.max(0, ((n >> 8) & 0xff) - 40);
    const b = Math.max(0, (n & 0xff) - 40);
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
  }
}
