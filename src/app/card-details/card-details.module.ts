import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardDetailsPage } from './card-details.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CardDetailsPage,
      },
    ]),
  ],
  declarations: [CardDetailsPage],
})
export class CardDetailsPageModule {}