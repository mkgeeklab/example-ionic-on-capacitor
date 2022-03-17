import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  NgZone,
  ApplicationRef,
  ElementRef
 } from '@angular/core';
import {
  MapView,
  Marker,
  LatLngBounds,
  InfoWindow,
  InfoWindowBase,
  Projection,
  IPoint,
  LatLng,
  ILatLng,
  ISize
} from '@open-google-maps-plugin/core';
import { HotelInfo } from './hotel-info/hotel-info.component';
import { HttpClient } from '@angular/common/http';
import { Hotel, HotelService } from './extras/hotel';
import { CustomInfoWindow } from './extras/custom-info-window';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.page.html',
  styleUrls: ['./info-window.page.scss']
})
export class InfoWindowPage implements OnInit, AfterViewInit, OnDestroy {

  infoWnd: any;

  compRef: ComponentRef<HotelInfo>;

  dataUrl: string = 'assets/hotel/data.json';
  hotels: Map<String, Hotel> = new Map<String, Hotel>();

  @ViewChild('mapCanvas') mapRef: ElementRef;
  map: MapView;

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private zone: NgZone,
    private http: HttpClient
  ) { }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.map = this.mapRef.nativeElement;

    // Creates a custom infoWindow
    this.infoWnd = new CustomInfoWindow();

    this.map.addEventListener('click', () => {
      if (this.compRef) {
        this.compRef.destroy();
        this.compRef = null;
      }
      this.infoWnd.close();
    });

    // Load starbucks_locations.json
    this.getHotels().subscribe((hotels: Hotel[]) => {

      const locations: ILatLng[] = [];
      hotels.forEach((hotel: Hotel): void => {
        this.hotels.set(hotel.id, hotel);
        locations.push(hotel.position);
      });

      // Fits camera viewport
      this.map.moveCamera({
        target: locations
      });
    });

  }

  ngOnDestroy() {
    if (this.compRef) this.compRef.destroy();
  }

  onMarkerSelect(event: CustomEvent, hotelData: Hotel) {

    const marker: Marker = event.target as Marker;
    this.openInfoWnd(marker, hotelData);
  }

  openInfoWnd(marker: Marker, hotelData: Hotel) {
    if (this.compRef) {
      this.compRef.destroy();
      this.compRef = null;
    }

    // Creates an instance of HotelInfo component
    this.compRef = this.resolver.resolveComponentFactory(HotelInfo).create(this.injector);

    // Sets the data to the hotelInfo component
    this.compRef.instance.setData(`assets/hotel/${hotelData.id}`, hotelData);
    this.compRef.changeDetectorRef.detectChanges();

    // Sets the image data to the custom infoWindow.
    this.infoWnd.setImageUrl(`assets/hotel/${hotelData.id}/${hotelData.thumbnail}`);

    // Renders the component, and places it onto the infoWindow.
    this.zone.run(() => {
      this.infoWnd.setContent(this.compRef.location.nativeElement);
      this.infoWnd.open(marker);
    });

    // Attaches the component view to the host view.
    this.appRef.attachView(this.compRef.hostView);

    // If the hotelInfo component is destroyed, detaches from the host view.
    this.compRef.onDestroy(() => {
      this.appRef.detachView(this.compRef.hostView);
    });

  }

  getHotels() {
    return this.http.get(this.dataUrl);
  }
}
