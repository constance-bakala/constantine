import {
  AfterViewInit,
  Component,
  DestroyRef,
  DOCUMENT,
  inject,
  NgZone,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ShopConfig } from '@app/core/firebase/app-config.repository';
import { ShopConfigService } from '@shared/services/shop-config.service';

declare global {
  interface Window {
    __sharethis__?: { initialize?: () => void };
    stButtons?: { loadButtons?: (doc: Document) => void };
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false,
})
export class ContactComponent implements AfterViewInit {

  readonly shop$: Observable<ShopConfig>;
  readonly shopConfig = inject(ShopConfigService);

  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private shareTimerId: ReturnType<typeof setTimeout> | null = null;
  private shareAttempt = 0;
  private readonly maxShareAttempts = 50;

  constructor() {
    this.shop$ = this.shopConfig.shop$;

    this.destroyRef.onDestroy(() => {
      if (this.shareTimerId != null) {
        clearTimeout(this.shareTimerId);
        this.shareTimerId = null;
      }
    });

    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      debounceTime(250),
      takeUntilDestroyed(),
    ).subscribe(() => this.queueShareThisRefresh());

    this.shop$.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      debounceTime(400),
      takeUntilDestroyed(),
    ).subscribe(() => this.queueShareThisRefresh());
  }

  ngAfterViewInit(): void {
    this.queueShareThisRefresh();
  }

  mailtoHref(email: string | undefined): string | null {
    const e = (email ?? '').trim();
    return e ? `mailto:${e}` : null;
  }

  displayWhatsapp(whatsapp: string | undefined, waDigits: string): string {
    const t = (whatsapp ?? '').trim();
    return t || (waDigits ? `+${waDigits}` : '');
  }

  /**
   * ShareThis scanne le DOM au chargement du script ; dans une SPA les nœuds
   * peuvent apparaître plus tard ou être réconciliés par Angular. On ré-appelle
   * l’API officielle quand la vue est prête, après navigation, ou quand la boutique
   * RTDB change (mise en page).
   */
  private queueShareThisRefresh(): void {
    if (this.shareTimerId != null) {
      clearTimeout(this.shareTimerId);
      this.shareTimerId = null;
    }
    this.shareAttempt = 0;
    this.scheduleShareTry();
  }

  private scheduleShareTry(): void {
    this.shareTimerId = setTimeout(() => this.tryShareThisRefresh(), 0);
  }

  private tryShareThisRefresh(): void {
    const win = this.doc.defaultView as Window | null;
    if (!win) return;

    const st = win.__sharethis__?.initialize;
    if (typeof st === 'function') {
      this.ngZone.runOutsideAngular(() => {
        try {
          st.call(win.__sharethis__);
        } catch {
          /* ShareThis peut throw si le conteneur est vide momentanément */
        }
      });
      this.shareTimerId = null;
      return;
    }

    const legacy = win.stButtons?.loadButtons;
    if (typeof legacy === 'function') {
      this.ngZone.runOutsideAngular(() => {
        try {
          legacy.call(win.stButtons, this.doc);
        } catch {
          /* idem */
        }
      });
      this.shareTimerId = null;
      return;
    }

    if (this.shareAttempt++ < this.maxShareAttempts) {
      this.shareTimerId = setTimeout(() => this.tryShareThisRefresh(), 200);
    } else {
      this.shareTimerId = null;
    }
  }
}
