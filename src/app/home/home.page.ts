import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { OpenGoogleMaps, MapView, LatLngBounds } from '@open-google-maps-plugin/capacitor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.map = this.mapRef.nativeElement;
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
