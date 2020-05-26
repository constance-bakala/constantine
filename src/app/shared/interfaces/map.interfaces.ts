export interface GooglemapZoom {
  initialValue: number,
  maxZoom: number,
  minZoom: number,
}

export interface GoogleMapConfig {
  lat: number;
  lng: number;
  zoom: GooglemapZoom;
  companyMarkerColor: string;
  companyTitle: string;
  companyInfo: string;
  size: {
    height: number
    width: number
  }
}
