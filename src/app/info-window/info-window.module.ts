import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoWindowPageRoutingModule } from './info-window-routing.module';

import { InfoWindowPage } from './info-window.page';
import { HotelInfo } from './hotel-info/hotel-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoWindowPageRoutingModule
  ],
  declarations: [
    HotelInfo,
    InfoWindowPage,
  ],
  entryComponents: [
    HotelInfo,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class InfoWindowPageModule {}
