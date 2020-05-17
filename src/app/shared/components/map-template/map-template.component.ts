import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {GoogleMapConfig} from '../../models/map.models';
import {AdItemComponent2} from '../advertisements/ad-item/ad-item-component2.component';
import {AdService} from '../../services/ad.service';

@Component({
  selector: 'app-map-template',
  templateUrl: './map-template.component.html',
  styleUrls: ['./map-template.component.scss']
})
export class MapTemplateComponent implements OnInit, AfterViewInit {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  @ViewChild('infoTemplate', { static: false }) details: TemplateRef<any>;

  @Input() mapConfig: GoogleMapConfig;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions;
  markers = [];
  infoContent = '';


  constructor() {
  }
  ngOnInit() {
    this.options= {
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      // mapTypeId: 'hybrid',
      maxZoom: this.mapConfig.zoom.maxZoom,
      minZoom: this.mapConfig.zoom.minZoom,
    };
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        // lat: position.coords.latitude,
        // lng: position.coords.longitude,
        lat: this.mapConfig.lat,
        lng: this.mapConfig.lng
      }
    });
    this.addMarker();
  }
  //-- set label(label: string | google.maps.MarkerLabel); --
  addMarker() {
   /* let numberMarkerImg = {
      url: '/assets/dresses/dress-18.png',
      size: new google.maps.Size(32, 38),
      scaledSize: new google.maps.Size(32, 38)
    };
    */
    this.markers.push({
      position: {
        lat: this.mapConfig.lat,
        lng: this.mapConfig.lng,
      },
      label: {
        color: this.mapConfig.companyMarkerColor,
        fontWeight: 'bold',
        text: 'Délice éternel', // + (this.markers.length + 1),
      },
      title: this.mapConfig.companyTitle, //+ (this.markers.length + 1),
      info: 'Prêt à porter, Vente de masques anti covid-19, Bijoux de fantaisie',//this.mapConfig.companyInfo, //+ (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
        opacity: 0.8,
        zIndex: 300,
        // icon: numberMarkerImg,
      },
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }

  ngAfterViewInit(): void {
    // this.markers[0].info = this.details.elementRef.nativeElement;
  }
}
