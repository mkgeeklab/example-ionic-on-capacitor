import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoWindowPageRoutingModule } from './info-window-routing.module';

import { InfoWindowPage } from './info-window.page';
import { ComponentsModule } from '../components/components.module';
import { HotelInfo } from '../components/hotel-info/hotel-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoWindowPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    InfoWindowPage,
  ],
})
export class InfoWindowPageModule {}
