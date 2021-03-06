import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PortfolioData} from '@shared/interfaces';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit, OnDestroy {

  @Input() data: PortfolioData;
  interval: any;
  photoIndexToPrint = 1;

  constructor() { }

  getRandomNumber(): number {
    return Math.floor(Math.random() * this.data.portfolioImagesSize) + 1;
  }

  ngOnInit() {
    this.getPhotoIndexToPrint();
  }


  getPhotoIndexToPrint() {
    this.interval = setInterval(() => {
      this.photoIndexToPrint = this.getRandomNumber();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
