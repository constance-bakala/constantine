import { Component, OnInit } from '@angular/core';
import {GoogleMapConfig} from '@shared/interfaces';
import {environment as env} from '@env/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  mapConfig: GoogleMapConfig;
  envName = env.envName;
  version = env.versions.app;
  isProd = env.production;

  constructor() { }

  ngOnInit() {


    this.mapConfig = {
      lat: 0.388537,
      lng: 9.447901,
      zoom: {
        initialValue: 17,
        maxZoom: 18,
        minZoom: 4,
      },
      companyMarkerColor: 'red',
      companyTitle: 'Délice éternel',
      companyInfo: 'Prêt à porter, vente de bijoux, masques grand public, robes ...  ',
      size: {
        height: 400,
        width: 400
      }
    }
  }

}
