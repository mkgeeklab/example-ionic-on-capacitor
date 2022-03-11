import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HotelInfo } from './hotel-info/hotel-info.component';
export { HotelInfo } from './hotel-info/hotel-info.component';

@NgModule({
  declarations: [
    HotelInfo
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HotelInfo,
  ],
  entryComponents: [
    HotelInfo,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
