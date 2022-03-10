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

    this.map.moveCamera({
      target: {lat: 43.08191296103446, lng: -89.3734700147583},
      zoom: 15,
      tilt: 60,
      heading: 0,
      duration: 5000
    });
  }

  onRotateButtonClick(event) {
    this.map.heading +=90;
  }

}
