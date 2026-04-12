import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopConfig } from '@app/core/firebase/app-config.repository';
import { ShopConfigService } from '@shared/services/shop-config.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false,
})
export class ContactComponent {

  readonly shop$: Observable<ShopConfig>;

  constructor(readonly shopConfig: ShopConfigService) {
    this.shop$ = this.shopConfig.shop$;
  }

  mailtoHref(email: string | undefined): string | null {
    const e = (email ?? '').trim();
    return e ? `mailto:${e}` : null;
  }

  displayWhatsapp(whatsapp: string | undefined, waDigits: string): string {
    const t = (whatsapp ?? '').trim();
    return t || (waDigits ? `+${waDigits}` : '');
  }
}
