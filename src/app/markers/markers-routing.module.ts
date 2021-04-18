import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkersPage } from './markers.page';

const routes: Routes = [
  {
    path: '',
    component: MarkersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarkersPageRoutingModule {}
