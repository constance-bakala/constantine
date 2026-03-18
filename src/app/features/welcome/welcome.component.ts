import {Component, OnInit} from '@angular/core';
import {PortfolioData} from '@shared/interfaces/portfolio.interfaces';
import {DRESS_GROUPS, EARING_GROUPS, MASK_GROUPS} from '@helpers/items-groups.const';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: false,
})
export class WelcomeComponent implements OnInit {

  disposition = 'col-md-6 col-lg-4 mb-5';
  //disposition = 'col-md-4 col-lg-3 mb-5';
  dataDresses!: PortfolioData;
  dataMasks!: PortfolioData;
  dataEarings!: PortfolioData;

  constructor() {
  }

  ngOnInit() {
    this.dataDresses = {
      portfolioLink: '/dresses',
      portfolioImagePrefix: 'dress',
      portfolioName: 'PRODUCTS.DRESSES.TITLE',
      portfolioImagesSize: DRESS_GROUPS.length,
      portfolioDirectory: 'dresses',
      portfolioGroupIds: DRESS_GROUPS.map(g => g.id)
    };
    this.dataMasks = {
      portfolioLink: '/masks',
      portfolioImagePrefix: 'mask',
      portfolioName: 'PRODUCTS.MASKS.TITLE',
      portfolioImagesSize: MASK_GROUPS.length,
      portfolioDirectory: 'masks',
      portfolioGroupIds: MASK_GROUPS.map(g => g.id)
    };

    this.dataEarings = {
      portfolioLink: '/earings',
      portfolioImagePrefix: 'earing',
      portfolioName: 'PRODUCTS.EARRINGS.TITLE',
      portfolioImagesSize: EARING_GROUPS.length,
      portfolioDirectory: 'jewellery',
      portfolioGroupIds: EARING_GROUPS.map(g => g.id)
    }
  }

}
