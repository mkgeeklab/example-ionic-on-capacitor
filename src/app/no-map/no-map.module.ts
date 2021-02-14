import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoMapPageRoutingModule } from './no-map-routing.module';

import { NoMapPage } from './no-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoMapPageRoutingModule
  ],
  declarations: [NoMapPage]
})
export class NoMapPageModule {}
