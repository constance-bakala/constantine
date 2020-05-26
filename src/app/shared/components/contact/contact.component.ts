import {Component, OnInit} from '@angular/core';
import {GoogleMapConfig, GooglemapZoom} from '../../interfaces/map.interfaces';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  mapConfig: GoogleMapConfig;

  constructor() {
  }
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
