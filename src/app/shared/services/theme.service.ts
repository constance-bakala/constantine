import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AppConfigRepository, ThemeConfig, THEME_DEFAULTS } from '@app/core/firebase/app-config.repository';

const SYSTEM_FONTS = ['Roboto', 'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Verdana', 'Trebuchet MS'];

/**
 * ThemeService
 * Lit config/theme depuis Firebase et applique les CSS custom properties sur :root.
 * Charge dynamiquement Google Fonts si la police n'est pas une police système.
 * À bootstrapper dans AppComponent.ngOnInit().
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {

  readonly theme$: Observable<ThemeConfig>;
  private loadedFont = '';

  constructor(private configRepo: AppConfigRepository) {
    this.theme$ = this.configRepo.watchTheme().pipe(shareReplay(1));
  }

  /** Démarre l'écoute et applique le thème en temps réel. */
  init(): void {
    this.apply(THEME_DEFAULTS); // applique les valeurs par défaut immédiatement
    this.theme$.subscribe(theme => this.apply(theme));
  }

  /** Aperçu live sans sauvegarde (utilisé par le wizard admin). */
  preview(partial: Partial<ThemeConfig>): void {
    const merged: ThemeConfig = { ...THEME_DEFAULTS, ...partial };
    if (!merged.primaryDark) merged.primaryDark = this.darken(merged.primaryColor);
    this.apply(merged);
  }

  // ── Privé ──────────────────────────────────────────────────────────────────

  private apply(theme: ThemeConfig): void {
    const root = document.documentElement;
    root.style.setProperty('--color-primary',        theme.primaryColor);
    root.style.setProperty('--color-primary-dark',   theme.primaryDark);
    root.style.setProperty('--color-secondary',      theme.secondaryColor);
    root.style.setProperty('--color-secondary-dark', this.darken(theme.secondaryColor));
    root.style.setProperty('--font-family',          theme.fontFamily);
    this.loadGoogleFont(theme.fontFamily);
  }

  /** Charge la police Google Fonts si elle n'est pas déjà chargée et n'est pas système. */
  private loadGoogleFont(fontFamily: string): void {
    const base = fontFamily.split(',')[0].trim().replace(/['"]/g, '');
    if (base === this.loadedFont) return;
    if (SYSTEM_FONTS.includes(base)) { this.loadedFont = base; return; }
    const existing = document.getElementById('theme-google-font');
    if (existing) existing.remove();
    const link = document.createElement('link');
    link.id   = 'theme-google-font';
    link.rel  = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(base)}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);
    this.loadedFont = base;
  }

  /** Assombrit une couleur hex de ~15% pour générer la variante dark. */
  private darken(hex: string): string {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (n >> 16) - 40);
    const g = Math.max(0, ((n >> 8) & 0xff) - 40);
    const b = Math.max(0, (n & 0xff) - 40);
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
  }
}
