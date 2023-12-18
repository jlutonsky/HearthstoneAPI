import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HearthstoneService } from '../services/hearthstone.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.page.html',
  styleUrls: ['./card-details.page.scss'],
})
export class CardDetailsPage implements OnInit {
  cardId: string = '';
  card: any;
  showDetails: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private hearthstoneService: HearthstoneService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idFromRoute = params.get('id');
      if (idFromRoute) {
        this.cardId = idFromRoute;
        this.loadCardDetails();
      } else {
        console.error('Card ID is null or undefined.');
      }
    });
  }

  loadCardDetails() {
    this.hearthstoneService.getCardById(this.cardId).subscribe(
      (data: any) => {
        this.card = data;
      },
      (error) => {
        console.error('Error fetching card by ID:', error);
      }
    );
  }

  toggleCardDetails() {
    this.showDetails = !this.showDetails;
  }
}