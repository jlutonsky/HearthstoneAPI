import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HearthstoneService } from '../services/hearthstone.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  cards: any[] = [];
  searchQuery: string = '';

  constructor(
    private navCtrl: NavController,
    private hearthstoneService: HearthstoneService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadAllCards();
  }

  loadAllCards() {
    this.hearthstoneService.getCards().subscribe(
      (cards) => {
        this.cards = cards;
      },
      (error: any) => {
        console.error('Error loading cards:', error);
      }
    );
  }

  searchCards() {
    if (this.searchQuery.trim() !== '') {
      this.hearthstoneService.getCardsBySearch(this.searchQuery).subscribe(
        (searchResults: any[]) => {
          this.cards = searchResults;
        },
        (error) => {
          console.error('Error searching cards:', error);
        }
      );
    } else {
      this.loadAllCards();
    }
  }

  showCardDetails(card: any) {
    this.navCtrl.navigateForward(`/card-details/${card.cardId}`);
  }

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }
}