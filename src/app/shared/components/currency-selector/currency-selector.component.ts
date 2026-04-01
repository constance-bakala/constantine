import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Currency } from '@shared/interfaces';
import { PricingService } from '@shared/services/pricing.service';
import { Auth } from '@angular/fire/auth';
import { UsersRepository } from '@app/core/firebase/users.repository';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  standalone: false,
})
export class CurrencySelectorComponent implements OnInit, OnDestroy {

  currentCurrency: Currency = this.pricing.currency;
  private subs = new Subscription();

  constructor(
    private pricing: PricingService,
    private translate: TranslateService,
    private auth: Auth,
    private usersRepository: UsersRepository,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.pricing.currency$.subscribe(c => { this.currentCurrency = c; })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get isFrench(): boolean {
    return (this.translate.currentLang ?? 'fr') === 'fr';
  }

  onCurrencyChange(value: string): void {
    this.pricing.setCurrency(value as Currency);
    const uid = this.auth.currentUser?.uid;
    if (uid) {
      this.usersRepository.savePreferences(uid, { currency: value });
    }
  }
}
