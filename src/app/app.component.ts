import { Component, OnInit } from '@angular/core';
import { OpenGoogleMapsInitializer } from '@test-plugin/capacitor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
      console.log("Register custom capacitor plugins");
      OpenGoogleMapsInitializer();
  }

}
