import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StarbucksPlace } from "./starbucksplace";
import { MapView, ILatLng, Marker, InfoWindow } from '@open-google-maps-plugin/core';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.page.html',
  styleUrls: ['./markers.page.scss'],
})
export class MarkersPage implements OnInit, AfterViewInit {

  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;

  @ViewChild('infoWnd') infoRef: ElementRef;
  infoWnd: InfoWindow;

  activeMarker: Marker | null = null;

  dataUrl: string = 'assets/starbucks_locations.json';
  stores: Map<String, StarbucksPlace> = new Map<String, StarbucksPlace>();

  constructor(
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    this.map = this.mapRef.nativeElement;
    this.infoWnd = this.infoRef.nativeElement;
  }

  ngOnInit() {

    // Load starbucks_locations.json
    this.getStores().subscribe((stores: StarbucksPlace[]) => {

      const locations: ILatLng[] = [];
      stores.forEach((store: StarbucksPlace): void => {
        this.stores.set(store.id, store);
        locations.push(store.position);
      });

      // pass to the fitBounds()
      // this.map.fitBounds(locations);
      this.map.moveCamera({
        target: locations
      })
    });
  }
  onMarkerSelect(event: CustomEvent) {

    // If there is a previous selected marker, remove the " active" class.
    if (this.activeMarker) {
      this.activeMarker.classList.remove('active');
    }

    // If a marker is selected, add " active" CSS class.
    const marker: Marker = event.target as Marker;
    this.activeMarker = marker;
    this.activeMarker.classList.add('active');

    const id: string = marker.getAttribute('id');
    const info: StarbucksPlace = this.stores.get(id);
    this.infoWnd.setContent(`${info.name}
      ${info.address}`);
    this.infoWnd.open(marker);
  }

  getStores() {
    return this.http.get(this.dataUrl);
  }
}
