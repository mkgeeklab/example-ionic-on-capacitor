import {
  Component,
  AfterViewInit,
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
import { HotelInfo } from '../components/hotel-info/hotel-info.component';
import { CustomInfoWindow } from '../extras/custom-info-window';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.page.html',
  styleUrls: ['./info-window.page.scss']
})
export class InfoWindowPage implements AfterViewInit {

  infoWnd: any;

  @ViewChild('marker1') marker1Ref: ElementRef;
  marker1: Marker;
  compRef: ComponentRef<HotelInfo>;


  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private zone: NgZone
  ) { }

  ngAfterViewInit() {
    this.marker1 = this.marker1Ref.nativeElement;

    this.infoWnd = new CustomInfoWindow();

    this.openInfoWnd();
  }

  openInfoWnd() {
    if (this.compRef) this.compRef.destroy();

    this.compRef = this.resolver.resolveComponentFactory(HotelInfo).create(this.injector);
    this.compRef.instance.name = 'Best Eastern Hotel';
    this.compRef.instance.stars = 5;
    this.compRef.instance.price = '$85';
    this.infoWnd.setImageUrl('assets/hotel/hotel1.jpg');
    this.compRef.changeDetectorRef.detectChanges();

    this.zone.run(() => {
      this.infoWnd.setContent(this.compRef.location.nativeElement);
      this.infoWnd.open(this.marker1);
    });

    this.appRef.attachView(this.compRef.hostView);

    this.compRef.onDestroy(() => {
      this.appRef.detachView(this.compRef.hostView);
    });

  }
}
