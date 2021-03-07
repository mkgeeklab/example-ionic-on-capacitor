import { Component, OnInit } from '@angular/core';
import { OpenGoogleMapsInitializer } from '@open-google-maps-plugin/capacitor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },

    {
      title: 'No map page',
      url: '/no-map'
    },
  ];
  ngOnInit() {
      console.log("Register custom capacitor plugins");
      OpenGoogleMapsInitializer();
  }

}
