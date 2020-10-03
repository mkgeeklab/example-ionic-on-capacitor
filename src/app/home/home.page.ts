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

  constructor() {
    // const map: Map = new Plugins.GoogleMaps.Map();
    // Plugins.GoogleMaps.echo({
    //   value: 'hello'
    // }).then((result) => {
    //   console.log(result);
    // });
    // map.someMethod();
    // Plugins.GoogleMaps.echo({
    //     value: 'Hello World'
    //   })
    //   .then((result: any) => {
    //     alert(result.value);
    //   });
  }

  ngOnInit() {
    const mapDiv = document.getElementById('hoge');
    console.log(new MapView(mapDiv));
  }
  onListItemClick(item: any) {
    if (this.list.length === 0) return;

    const idx: number = this.list.indexOf(item);
    this.list.splice(item, 1);
  }
  onButtonClick() {
    this.list.push({
      idx: this.counter,
      label: `count:${++this.counter}`
    });
  }

}
