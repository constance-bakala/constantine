import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GoogleMapConfig } from '@shared/interfaces/map.interfaces';

@Component({
  selector: 'app-map-template',
  templateUrl: './map-template.component.html',
  styleUrls: ['./map-template.component.scss'],
  standalone: false,
})
export class MapTemplateComponent implements OnInit, AfterViewInit {

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  @ViewChild('infoTemplate', { static: false }) details!: TemplateRef<any>;

  @Input() mapConfig!: GoogleMapConfig;
  center!: google.maps.LatLngLiteral;
  options!: google.maps.MapOptions;
  markers: any[] = [];
  infoContent = '';


  isGoogleMapsLoaded = typeof (window as any)['google'] !== 'undefined';

  constructor() {
  }
  ngOnInit() {
    if (!this.isGoogleMapsLoaded) return;
    this.options = {
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      // mapTypeId: 'hybrid',
      maxZoom: this.mapConfig.zoom.maxZoom,
      minZoom: this.mapConfig.zoom.minZoom,
    };
    navigator.geolocation.getCurrentPosition(() => {
      this.center = {
        lat: this.mapConfig.lat,
        lng: this.mapConfig.lng
      }
    });
    this.addMarker();
  }
  //-- set label(label: string | google.maps.MarkerLabel); --
  addMarker() {
    if (!this.isGoogleMapsLoaded) return;
    this.markers.push({
      position: {
        lat: this.mapConfig.lat,
        lng: this.mapConfig.lng,
      },
      label: {
        color: this.mapConfig.companyMarkerColor,
        fontWeight: 'bold',
        text: 'Délice éternel',
      },
      title: this.mapConfig.companyTitle,
      info: 'Prêt à porter, Vente de masques anti covid-19, Bijoux de fantaisie',
      options: {
        animation: (window as any)['google'].maps.Animation.BOUNCE,
        opacity: 0.8,
        zIndex: 300,
      },
    })
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content;
    this.info.open(marker);
  }

  ngAfterViewInit(): void {
    // this.markers[0].info = this.details.elementRef.nativeElement;
  }
}
