import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {
  MapView,
  Marker,
  LatLngBounds,
  InfoWindow,
  Projection,
  IPoint,
  LatLng,
  ILatLng
} from '@open-google-maps-plugin/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;

  @ViewChild('infoWnd1') info1Ref: ElementRef;
  infoWnd1: InfoWindow;


  hasClass: boolean = false;

  constructor() { }

  async ngAfterViewInit() {
    // this.infoWnd1 = new InfoWindow();
    this.infoWnd1 = this.info1Ref.nativeElement;
    this.map = this.mapRef.nativeElement;
    this.map.addEventListener('ready', () => this.onMapReady());
  }

  onMapReady() {
    this.infoWnd1.addEventListener('click',  (event) => {
      if (this.hasClass) {
        this.infoWnd1.classList.remove("active_info", "animate__animated", "animate__flip");
      } else {
        this.infoWnd1.classList.add("active_info", "animate__animated", "animate__flip");
      }
      this.hasClass = !this.hasClass;
    });
  }

  onMarkerClick(event) {
    const marker: Marker = event.target as Marker;
    const message: string = marker.getAttribute('message');

    this.infoWnd1.setContent(message);
    this.infoWnd1.open(marker);

  }
  onCameraButtonClick(event) {

    const bounds: LatLngBounds = new LatLngBounds();

    bounds.extend({
      lat: 43.0763334001421,
      lng: -89.38346928996582
    });
    bounds.extend({
      lat: 43.0718505758718,
      lng: -89.38437051219482
    });
    bounds.extend({
      lat: 43.07658417782822,
      lng: -89.37231130046386
    });
    bounds.extend({
      lat: 43.08191296103446,
      lng: -89.3734700147583
    });
    bounds.extend({
      lat: 43.075737799024346,
      lng: -89.39428395671386
    });

    this.map.moveCamera({
      target: bounds,
      tilt: 60,
      heading: 0,
      duration: 5000
    });
  }

  onRotateButtonClick(event) {
    this.map.setHeading(this.map.getHeading() + 90);
  }

}
