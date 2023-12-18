import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CollectionPage } from './collection/collection.page';
import { CardDetailsPage } from './card-details/card-details.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'card-details/:id',
    loadChildren: () => import('./card-details/card-details.module').then(m => m.CardDetailsPageModule),
  },
  {
    path: 'collection',
    component: CollectionPage,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
