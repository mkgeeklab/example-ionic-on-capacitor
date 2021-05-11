import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {
  OpenGoogleMaps,
  MapView,
  Marker,
  LatLngBounds,
  InfoWindow
} from '@open-google-maps-plugin/capacitor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;

  @ViewChild('infoWnd1') infoWnd1Ref: ElementRef;
  infoWnd1: InfoWindow;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.map = this.mapRef.nativeElement;
    this.infoWnd1 = this.infoWnd1Ref.nativeElement;
  }

  /**
   * Invoked when you click on a marker.
   * You can get the clicked marker instance from event.target property.
   *
   * In this example, get the string from the message attribute using getAttribute() method.
   * Because the message atrribute is not defined as regular property,
   * you need to access using getAttribute() method.
   */
  onMarkerClick(event) {
    const marker: Marker = event.target as Marker;
    const message: string = marker.getAttribute('message');

    this.infoWnd1.setContent(message);
    this.infoWnd1.open(marker);


    console.log("--->onMarkerClick", marker.getAttribute('message'));

  }
  onMapClick(event) {
    console.log("--->onMapClick", event);
  }

  onMarkerDrop(event) {
    console.log("--->onMarkerDrop", event);
  }
  onButtonClick() {
    const bounds: LatLngBounds = new LatLngBounds();
    bounds.extend({
      lat: 40.80963995832447,
      lng: -111.47175908088684
    });
    bounds.extend({
      lat: 45.24007471775099,
      lng: -111.47175908088684
    });
    bounds.extend({
      lat: 45.24007471775099,
      lng: -103.64949345588684
    });
    bounds.extend({
      lat: 40.5430142538686,
      lng: -103.47371220588684
    });
    this.map.fitBounds(bounds);
  }

}
