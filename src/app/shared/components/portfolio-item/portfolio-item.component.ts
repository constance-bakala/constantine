import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PortfolioData } from '@shared/interfaces';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss'],
  standalone: false,
})
export class PortfolioItemComponent implements OnInit, OnDestroy {
  @Input() data!: PortfolioData;

  currentImageUrl!: string;
  displayName = '';

  private intervalId: any;
  private langSub = new Subscription();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const urls = this.data.imageUrls?.length ? this.data.imageUrls : [this.data.coverImageUrl];
    let index = Math.floor(Math.random() * urls.length);
    this.currentImageUrl = urls[index];

    if (urls.length > 1) {
      this.intervalId = setInterval(() => {
        index = (index + 1) % urls.length;
        this.currentImageUrl = urls[index];
      }, 3000);
    }

    this.updateDisplayName(this.translate.currentLang ?? 'fr');
    this.langSub = this.translate.onLangChange.subscribe(({ lang }) => {
      this.updateDisplayName(lang);
    });
  }

  private updateDisplayName(lang: string): void {
    const enName = this.data.portfolioNameEn?.trim();
    this.displayName = (lang === 'en' && enName) ? enName : this.data.portfolioName;
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.langSub.unsubscribe();
  }
}
