import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren,
NgZone, QueryList } from '@angular/core';
import {
  MapView,
  Marker,
  InfoWindow,
  ILatLng,
  Spherical
} from '@open-google-maps-plugin/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;

  @ViewChild('infoWnd') info1Ref: ElementRef;
  infoWnd: InfoWindow;
  slot: HTMLSlotElement = document.createElement('slot');

  @ViewChildren('marker', { read: ElementRef }) markers: QueryList<ElementRef>;

  private currentMarker: Marker | undefined = undefined;

  hasClass: boolean = false;

  constructor(
    private zone: NgZone
  ) { }

  async ngAfterViewInit() {
    this.infoWnd = this.info1Ref.nativeElement;
    this.map = this.mapRef.nativeElement;
    this.map.addEventListener('ready', () => this.onMapReady());
    this.map.addEventListener('click', () => this.closeInfoWindow());
  }

  onMapReady() {
    //
    // Map is ready to use (recommended)
    //
    this.currentMarker = this.markers.first.nativeElement;
    this.currentMarker.dispatchEvent(new Event('click'));

    //
    // Change the infoWindow design when clicks on it.
    // The 'animate__animated' and 'animate__flip' classes are defined in AnimateCSS module.
    //
    // this.infoWnd.addEventListener('click',  (event) => {
    //   if (this.hasClass) {
    //     this.infoWnd.classList.remove("night_mode", "animate__animated", "animate__flip");
    //   } else {
    //     this.infoWnd.classList.add("night_mode", "animate__animated", "animate__flip");
    //   }
    //   this.hasClass = !this.hasClass;
    // });
  }


  moveCamera(nextIdx: number) {
    this.closeInfoWindow();

    const nextMarker: Marker = (this.markers.toArray() as ElementRef[])[nextIdx].nativeElement;
    nextMarker.dispatchEvent(new Event('click'));

    const heading: number = Spherical.computeHeading(this.currentMarker.getPosition(), nextMarker.getPosition());
    this.map.moveCamera({
      target: nextMarker.getPosition(),
      heading,
      duration: 3000
    });

    this.currentMarker = nextMarker;
  }

  closeInfoWindow() {
    // Put back the content HTML elements under the <ogmp-marker>
    const div: HTMLDivElement | undefined = this.infoWnd.getContent();
    if (div) {
      Array.from(div.children).forEach((child) => {
        this.currentMarker.appendChild(child);
      });
    }
    this.infoWnd.close();
  }


  onMarkerClick(event) {
    this.closeInfoWindow();

    // Move content HTML elements from under the <ogmp-marker> into a <div>
    const div: HTMLDivElement = document.createElement('div');
    const marker: Marker = event.target as Marker;
    Array.from(marker.children).forEach((child) => {
      div.appendChild(child);
    });

    // Open the infoWindow
    this.infoWnd.setContent(div);
    this.infoWnd.open(marker);
    this.currentMarker = marker;
  }

  setCameraToOverview() {
    //
    // Move camera to the location where includes all given points
    //
    const locations: ILatLng[] = [];
    locations.push({
      lat: 48.86527812902362,
      lng: 2.336551264527852
    });
    locations.push({
      lat: 48.85938405427252,
      lng: 2.3235041781053125
    });
    locations.push({
      lat: 48.847885196080476,
      lng: 2.347073579366156
    });
    locations.push({
      lat: 48.85443729877828,
      lng: 2.355783238061027
    });
    locations.push({
      lat: 48.869826453122236,
      lng: 2.344980979293237
    });
    locations.push({
      lat: 48.88065735202147,
      lng: 2.340754520227556
    });

    this.map.moveCamera({
      target: locations,
      tilt: 60,
      heading: 70,
      duration: 3000
    });
  }

}
