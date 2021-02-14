import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { OpenGoogleMaps, BaseClass, MapView } from '@test-plugin/capacitor';

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
  onButtonClick() {
    console.log("--->onButtonClick");
    this.list.push({
      idx: this.counter,
      label: `count:${++this.counter}`
    });
  }

}
