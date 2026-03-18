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
  interval: any;
  photoIndexToPrint = 1;

  constructor() { }

  getRandomGroupId(): number {
    const ids = this.data.portfolioGroupIds;
    return ids[Math.floor(Math.random() * ids.length)];
  }

  ngOnInit() {
    this.photoIndexToPrint = this.getRandomGroupId();
    this.getPhotoIndexToPrint();
  }


  getPhotoIndexToPrint() {
    this.interval = setInterval(() => {
      this.photoIndexToPrint = this.getRandomGroupId();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
