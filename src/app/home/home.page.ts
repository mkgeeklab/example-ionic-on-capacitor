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
  center: ILatLng | LatLng = new LatLng(0, 0);
  zoom: number = 0;
  tilt: number = 0;
  heading: number = 0;

  rotateAngle: number = 0;

  private markers: Marker[] = [];

  @ViewChild('infoWnd1') info1Ref: ElementRef;
  infoWnd1: InfoWindow;

  @ViewChild('mouseTouchLayer') mouseTouchLayer: ElementRef;

  hasClass: boolean = false;

  constructor() { }

  async ngAfterViewInit() {
    // this.infoWnd1 = new InfoWindow();
    this.infoWnd1 = this.info1Ref.nativeElement;
    this.map = this.mapRef.nativeElement;
    this.map.addEventListener('ready', () => this.onMapReady());
  }

  onMouseTouchLayer(event: MouseEvent) {
    const latLng: LatLng = this.map.fromContainerPixelToLatLng({
      x: event.offsetX,
      y: event.offsetY
    }, true);
    console.log(`(${event.offsetX}, ${event.offsetY}) -> ${latLng.toUrlValue()}`)

    const marker: Marker = new Marker({
      'position': latLng,
      'draggable': true,
      'icon': 'orange',
    });


    this.map.append(marker);

    this.markers.push(marker);


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
  onClearMarkers(event) {
    this.markers.forEach((marker) => {
      marker.remove();
    })
    this.markers.length = 0;
  }
  onLayerToggleButtonClick(event) {
    this.mouseTouchLayer.nativeElement.classList.toggle('hidden');
  }

  onMapClick(event) {

    const marker: Marker = new Marker({
      'position': event.detail.latLng,
      'draggable': true,
    });

    const infoWnd: InfoWindow = new InfoWindow();
    const pos = this.map.getProjection().fromLatLngToPoint(event.detail.latLng);
    const message: string = `x: ${pos.x}\ny: ${pos.y}`;
    infoWnd.setContent(message);
    marker.addEventListener('click', (event: CustomEvent) => {
      infoWnd.classList.add('animate__tada',  "animate__animated");
      infoWnd.open(marker);
    });
    infoWnd.addEventListener('click', (event: CustomEvent) => {
      infoWnd.classList.remove('animate__tada',  "animate__animated");
      infoWnd.close();
    });


    this.map.append(marker);
    marker.dispatchEvent(new Event('click'));

    this.markers.push(marker);

  }
  onCameraButtonClick(event) {

    this.map.moveCamera({
      center: {lat: 43.08191296103446, lng: -89.3734700147583},
      zoom: 15,
      tilt: 60,
      heading: 0,
      duration: 5000
    });
  }
  onTiltButtonClick(event, angle) {
    this.map.tilt += angle;

  }
  onRotateButtonClick(event, angle) {

    this.rotateAngle = (this.rotateAngle + angle) % 360;
    if (this.rotateAngle < 0) {
      this.rotateAngle += 360;
    }
    // console.log('set', this.rotateAngle);
    // this.map.moveCamera({
    //   heading: this.rotateAngle,
    //   duration: 1000
    // });
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
    console.log(bounds.toUrlValue());
    // this.map.fitBounds(bounds);
  }

}
