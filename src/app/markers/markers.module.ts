import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarkersPageRoutingModule } from './markers-routing.module';

import { MarkersPage } from './markers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarkersPageRoutingModule
  ],
  declarations: [MarkersPage]
})
export class MarkersPageModule {}
