import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StarbucksPlace } from "./starbucksplace";
import { MapView, ILatLng, Marker } from '@open-google-maps-plugin/capacitor';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.page.html',
  styleUrls: ['./markers.page.scss'],
})
export class MarkersPage implements OnInit {

  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;

  activeMarker: Marker | null = null;

  dataUrl: string = 'assets/starbucks_locations.json';
  stores: StarbucksPlace[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngAfterViewInit() {
    this.map = this.mapRef.nativeElement;
  }

  ngOnInit() {

    // Load starbucks_locations.json
    this.getStores().subscribe((stores: StarbucksPlace[]) => {
      this.stores = stores;

      // Pick up the position values
      const locations: ILatLng[] = [];
      stores.forEach(store => {
        locations.push(store.position);
      });

      // pass to the fitBounds()
      this.map.fitBounds(locations);
    });
  }

  onMarkerSelect(event: CustomEvent) {

    // If there is a previous selected marker, remove the " active" class.
    if (this.activeMarker) {
      this.activeMarker.className = this.activeMarker.className.replace(' active', '');
    }

    // If a marker is selected, add " active" CSS class.
    const marker: Marker = event.target as Marker;
    marker.className += ' active';
    this.activeMarker = marker;
  }

  getStores() {
    return this.http.get(this.dataUrl);
  }
}
