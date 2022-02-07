import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {
  OpenGoogleMaps,
  MapView,
  Marker,
  LatLngBounds,
  InfoWindow,
  Projection,
  IPoint,
  LatLng
} from '@open-google-maps-plugin/capacitor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;

  rotateAngle: number = 0;

  infoWnd1: InfoWindow = new InfoWindow();

  constructor() { }

  ngOnInit() {
  }
  async ngAfterViewInit() {
    this.map = this.mapRef.nativeElement;
    this.map.addEventListener('ready', () => this.onMapReady());
  }

  onMapReady() {
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

  }
 onMarkerClick2(event) {
   const marker: Marker = event.target as Marker;
   const position: LatLng | null = marker.getPosition();
   if (!position) {
     return;
   }


   const projection: Projection = this.map.getProjection();
   const zoom: number = this.map.getZoom();

   const point: IPoint = projection.fromLatLngToPoint(position, zoom);
   const message: string = `latLng : ${position.toString()}
   point: ${point.x}, ${point.y}`;
   console.log(message);

   this.infoWnd2.setContent("marker2");
   this.infoWnd2.open(marker);

 }
  onMapClick(event) {
    const marker: Marker = new Marker({
      'position': event.detail.latLng,
      'icon': "assets/burger.png"
    });

    const infoWnd: InfoWindow = new InfoWindow();
    const message: string = `lat: ${event.detail.latLng.lat}\nlng: ${event.detail.latLng.lng}`;
    marker.addEventListener('click', () => {
      infoWnd.setContent(message);
      infoWnd.open(marker);
    });

    this.map.append(marker);
    marker.dispatchEvent(new Event('click'));

  }

  onRotateButtonClick(event) {
    this.rotateAngle = (this.rotateAngle + 90) % 360;
    this.map.heading = this.rotateAngle;
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
