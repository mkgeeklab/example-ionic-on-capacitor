import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { GoogleMaps, BaseClass, MapView } from '@test-plugin/capacitor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  list: any[] = [];
  counter: number = 0;

  constructor() { }

  ngOnInit() {
    const mapDiv = document.getElementById('hoge');
    const map: MapView = new MapView(mapDiv, {
      camera: {
        target: {lat: 38, lng: 137},
        zoom: 0
      },
      mapTypeId: 'normal'
    });
  }
  onListItemClick(item: any) {
    if (this.list.length === 0) return;

    const idx: number = this.list.indexOf(item);
    this.list.splice(idx, 1);
  }
  onButtonClick() {
  console.log("--->onButtonClick");
    this.list.push({
      idx: this.counter,
      label: `count:${++this.counter}`
    });
  }

}
