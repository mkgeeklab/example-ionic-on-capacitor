import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {
  MapView,
  Marker,
  InfoWindow,
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

  @ViewChild('centerMarker') centerMarkerRef: ElementRef;

  hasClass: boolean = false;

  async ngAfterViewInit() {
    this.infoWnd1 = this.info1Ref.nativeElement;
    this.map = this.mapRef.nativeElement;
    this.map.addEventListener('ready', () => this.onMapReady());
    this.map.addEventListener('click', () => this.onMapClick());
  }

  onMapReady() {
    //
    // Map is ready to use (recommended)
    //
    const centerMarker: Marker = this.centerMarkerRef.nativeElement;
    centerMarker.dispatchEvent(new Event('click'));

    //
    // Change the infoWindow design when clicks on it.
    // The 'animate__animated' and 'animate__flip' classes are defined in AnimateCSS module.
    //
    this.infoWnd1.addEventListener('click',  (event) => {
      if (this.hasClass) {
        this.infoWnd1.classList.remove("night_mode", "animate__animated", "animate__flip");
      } else {
        this.infoWnd1.classList.add("night_mode", "animate__animated", "animate__flip");
      }
      this.hasClass = !this.hasClass;
    });
  }

  onMapClick() {
    //
    // Close the infoWindow when clicks on the map
    //
    this.infoWnd1.close();
  }


  onMarkerClick(event) {
    //
    // Open the infoWindow when a marker is clicked
    //
    const marker: Marker = event.target as Marker;
    this.infoWnd1.setContent(marker.innerHTML);
    this.infoWnd1.open(marker);
  }

  onCameraButtonClick(event) {
    //
    // Move camera to the location where includes all given points
    //
    const locations: ILatLng[] = [];
    locations.push({
      lat: 48.85938405427252,
      lng: 2.3235041781053125
    });
    locations.push({
      lat: 48.85443729877828,
      lng: 2.355783238061027
    });
    locations.push({
      lat: 48.88065735202147,
      lng: 2.340754520227556
    });
    locations.push({
      lat: 48.847885196080476,
      lng: 2.347073579366156
    });
    locations.push({
      lat: 48.86527812902362,
      lng: 2.336551264527852
    });
    locations.push({
      lat: 48.84374527017778,
      lng: 2.295592551751733
    });
    locations.push({
      lat: 48.86870067097262,
      lng: 2.359778781391679
    });

    this.map.moveCamera({
      target: locations,
      tilt: 60,
      heading: 70,
      duration: 5000
    });
  }

  onRotateButtonClick(event) {
    //
    // Rotates the map
    //
    this.map.setHeading(this.map.getHeading() + 90);
  }

}
