import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  private intervalId: any;

  ngOnInit(): void {
    const urls = this.data.imageUrls?.length ? this.data.imageUrls : [this.data.coverImageUrl];
    // Démarrer à un index aléatoire
    let index = Math.floor(Math.random() * urls.length);
    this.currentImageUrl = urls[index];

    if (urls.length > 1) {
      this.intervalId = setInterval(() => {
        index = (index + 1) % urls.length;
        this.currentImageUrl = urls[index];
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
