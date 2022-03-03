import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoordinatePage } from './coordinate.page';

const routes: Routes = [
  {
    path: '',
    component: CoordinatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatePageRoutingModule {}
