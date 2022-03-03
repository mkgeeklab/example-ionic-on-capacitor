import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {
  MapView,
  Marker,
  LatLng,
  ILatLng,
  IPoint,
  Projection,
} from '@open-google-maps-plugin/core';

@Component({
  selector: 'map-coordinate',
  templateUrl: './coordinate.page.html',
  styleUrls: ['./coordinate.page.scss'],
})
export class CoordinatePage implements AfterViewInit {

  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;
  @ViewChild('origin') originRef: ElementRef;
  originMarker: Marker;
  @ViewChild('destination') destRef: ElementRef;
  destMarker: Marker;


  svgLeft: string = `0px`;
  svgTop: string = `0px`;
  svgWidth: string = `0px`;
  svgHeight: string = `0px`;
  animateValues: string = "0,0; 100,100";
  animateToY: number = 0;

  constructor() { }

  ngAfterViewInit() {
    this.map = this.mapRef.nativeElement;
    this.originMarker = this.originRef.nativeElement;
    this.destMarker = this.destRef.nativeElement;


    this.map.addEventListener('ready', () => this.onMapReady(), {
      once: true
    });

  }
  onMapReady() {

    // Fits the camera to the given bounds
    this.map.fitBounds([
      {"lat": 40.712216, "lng": -74.22655},
      {"lat": 40.773941, "lng": -74.12544}
    ]);

    this.originMarker.setPosition({"lat": 40.712216, "lng": -74.22655});
    this.destMarker.setPosition({"lat": 40.773941, "lng": -74.12544});
    
    this.map.addEventListener('bounds_changed', () => this.redraw());
    this.map.addEventListener('tilt_changed', () => this.redraw());
    this.map.addEventListener('heading_changed', () => this.redraw());
    this.originMarker.addEventListener('position_changed', () => this.redraw());
    this.destMarker.addEventListener('position_changed', () => this.redraw());
  }

  redraw() {
    const origin: LatLng = this.originMarker.getPosition();
    const dest: LatLng = this.destMarker.getPosition();

    const originPx: IPoint = this.map.fromLatLngToContainerPixel(origin);
    const destPx: IPoint = this.map.fromLatLngToContainerPixel(dest);
    console.log(originPx, destPx);

    const left: number = Math.min(originPx.x, destPx.x);
    const top: number = Math.min(originPx.y, destPx.y);
    const width: number = Math.max(originPx.x, destPx.x) - left;
    const height: number = Math.max(originPx.y, destPx.y) - top;

    this.svgLeft = `${ left }px`;
    this.svgTop = `${ top }px`;
    this.svgWidth = `${ width }px`;
    this.svgHeight = `${ height }px`;

    let animateFromX: number = 0;
    let animateToX: number = width;
    if (originPx.x >= destPx.x) {
      animateFromX = width;
      animateToX = 0;
    }
    let animateFromY: number = 0;
    let animateToY: number = height;
    if (originPx.y >= destPx.y) {
      animateFromY = height;
      animateToY = 0;
    }
    this.animateValues = `${ animateFromX },${ animateFromY }; ${ animateToX },${ animateToY }`;
    console.log(this.animateValues);
  }

}
