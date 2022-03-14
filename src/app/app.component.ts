import { Component, OnInit } from '@angular/core';
import { OpenGoogleMapsInitializer } from '@open-google-maps-plugin/core';

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
      title: 'coordonate',
      url: '/map-coordinate'
    },
    {
      title: 'InfoWindow',
      url: '/info-window'
    },
    {
      title: 'No map page',
      url: '/no-map'
    },

    {
      title: 'Markers',
      url: '/markers'
    },
  ];
  ngOnInit() {
    OpenGoogleMapsInitializer({
      'API_KEY_FOR_BROWSER': "AIzaSyBpNKkll5yJ2YbS-i0dE5yIdEk8sef-S6g"
    });
  }

}
