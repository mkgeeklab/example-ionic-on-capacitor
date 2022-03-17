import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'no-map',
    loadChildren: () => import('./no-map/no-map.module').then( m => m.NoMapPageModule)
  },
  {
    path: 'markers',
    loadChildren: () => import('./markers/markers.module').then( m => m.MarkersPageModule)
  },
  {
    path: 'map-coordinate',
    loadChildren: () => import('./coordinate/coordinate.module').then( m => m.CoordinatePageModule)
  },
  {
    path: 'info-window',
    loadChildren: () => import('./info-window/info-window.module').then( m => m.InfoWindowPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
