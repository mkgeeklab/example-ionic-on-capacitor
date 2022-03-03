import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoordinatePageRoutingModule } from './coordinate-routing.module';

import { CoordinatePage } from './coordinate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoordinatePageRoutingModule
  ],
  declarations: [CoordinatePage]
})
export class CoordinatePageModule {}
