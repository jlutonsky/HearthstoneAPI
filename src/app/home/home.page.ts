import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HearthstoneService } from '../services/hearthstone.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cardSets: any[] = [];
  searchQuery: string = '';
  randomCard: any = null;

  selectedCard: any = {
    name: '',
    description: '',
  };

  constructor(private router: Router, private hearthstoneService: HearthstoneService) {}

  ngOnInit() {
    this.loadAllCards();
  }

  loadAllCards() {
    this.hearthstoneService.getCards().subscribe(
      (data: any) => {
        this.cardSets = Object.keys(data).map((setName) => {
          let cards = data[setName];

          if (Array.isArray(cards)) {
            cards = cards.filter((card: any) => card.collectible);
          } else if (typeof cards === 'object') {
            cards = Object.values(cards).filter((card: any) => card.collectible);
          }

          return {
            setName: setName,
            cards: cards,
          };
        });
      },
      (error) => {
        console.error('Error fetching all cards:', error);
      }
    );
  }

  searchCards() {
    if (this.searchQuery.trim() !== '') {
      this.hearthstoneService.getCardsBySearch(this.searchQuery).subscribe(
        (searchResults: any[]) => {
          this.cardSets = [{
            setName: 'Search Results',
            cards: searchResults
          }];
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
    this.hearthstoneService.getCardById(card.cardId).subscribe(
      (detailedCard: any) => {
        if (detailedCard) {
          this.selectedCard = detailedCard;
        } else {
          console.error('Failed to get card details.');
        }
      },
      (error) => {
        console.error('Error fetching card details:', error);
      }
    );
  }
}
