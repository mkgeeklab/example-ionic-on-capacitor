import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoMapPage } from './no-map.page';

const routes: Routes = [
  {
    path: '',
    component: NoMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoMapPageRoutingModule {}
