import {Component, OnInit} from '@angular/core';
import {PortfolioData} from '@shared/interfaces/portfolio.interfaces';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  disposition = 'col-md-6 col-lg-4 mb-5';
  //disposition = 'col-md-4 col-lg-3 mb-5';
  dataDresses: PortfolioData;
  dataMasks: PortfolioData;
  dataEarings: PortfolioData;

  constructor() {
  }

  ngOnInit() {
    this.dataDresses = {
      portfolioLink: '/dresses',
      portfolioImagePrefix: 'dress',
      portfolioName: 'Robes',
      portfolioImagesSize: 29,
      portfolioDirectory: 'dresses'
    };
    this.dataMasks = {
      portfolioLink: '/masks',
      portfolioImagePrefix: 'mask',
      portfolioName: 'Masques',
      portfolioImagesSize: 62,
      portfolioDirectory: 'masks'
    };

    this.dataEarings = {
      portfolioLink: '/earings',
      portfolioImagePrefix: 'earing',
      portfolioName: 'Boucles d\'oreille',
      portfolioImagesSize: 17,
      portfolioDirectory: 'jewellery'
    }
  }

}
