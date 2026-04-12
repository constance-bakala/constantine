import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AppConfigRepository, ShopConfig, SHOP_DEFAULTS } from '@app/core/firebase/app-config.repository';

/**
 * ShopConfigService
 * Source de vérité unique pour la configuration boutique (nom, slogan, contact).
 * Lit config/shop depuis Firebase en temps réel.
 * Utilisé par : NavigationComponent, FooterComponent, ContactComponent.
 */
@Injectable({ providedIn: 'root' })
export class ShopConfigService {

  /** Observable de la config boutique, replay pour les late subscribers. */
  readonly shop$: Observable<ShopConfig>;

  /** Valeur synchrone courante (mise à jour à chaque émission). */
  current: ShopConfig = { ...SHOP_DEFAULTS };

  constructor(private configRepo: AppConfigRepository) {
    this.shop$ = this.configRepo.watchShop().pipe(shareReplay(1));
    this.shop$.subscribe(shop => { this.current = shop; });
  }

  /** Chiffres seuls (indicatif pays + numéro) pour `wa.me/…`. */
  whatsappDigits(whatsapp: string | undefined | null): string {
    return String(whatsapp ?? '').replace(/\D/g, '');
  }

  /** Suffixe `wa.me/XXXX` si le numéro semble utilisable, sinon `null`. */
  whatsappWaPath(whatsapp: string | undefined | null): string | null {
    const d = this.whatsappDigits(whatsapp);
    return d.length >= 8 ? d : null;
  }
}
