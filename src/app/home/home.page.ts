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

  list: any[] = [];
  counter: number = 0;

  places: any[] = [
    {
      lat: 43.0763334001421,
      lng: -89.38346928996582,
      class: "marker1"
    },
    {
      lat: 43.07040847877679,
      lng: -89.3862587873413,
      class: "marker1"
    },
    {
      lat: 43.07799478318986,
      lng: -89.37535828990478,
      class: "marker2"
    },
    {
      lat: 43.0741704,
      lng: -89.3809802,
      class: "marker2"
    },
  ];

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.map = this.mapRef.nativeElement;
  }
  onListItemClick(item: any) {
    if (this.list.length === 0) return;

    const idx: number = this.list.indexOf(item);
    this.list.splice(idx, 1);
  }
  onMapClick(event) {
    console.log("--->onMapClick", event);
  }
  onMapDrag(event) {
    console.log("--->onMapDrag", event);
  }
  onMarkerClick(event) {
    console.log("--->onMarkerClick", event);
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
