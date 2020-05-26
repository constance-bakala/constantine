import {Component, OnInit} from '@angular/core';
import {environment as env} from '@env/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  logoFondClair = require('../../../assets/portfolio/boucle_oreille_sans_arriere_plan.png');
  logoGroup = require('../../../assets/portfolio/photo_maman2-removebg-preview.png');
  envName = env.envName;
  version = env.versions.app;
  isProd = env.production;
  constructor() {}

  ngOnInit() {}
}
