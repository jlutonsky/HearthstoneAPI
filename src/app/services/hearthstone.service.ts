import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HearthstoneService {
  private baseUrl = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/';
  private pageSize = 20; 

  private cardCache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  getCards(page: number = 1): Observable<any[]> {
    return this.getCachedData(`allCards_${page}`, () => {
      const headers = this.getHeaders();
      const params = new HttpParams().set('page', page.toString()).set('pageSize', this.pageSize.toString());

      return this.http.get<any[]>(`${this.baseUrl}cards`, { headers, params }).pipe(
        map((data) => this.extractCollectibleCards(data)),
        catchError((error) => {
          console.error('Error fetching paged cards:', error);
          return of([]);
        })
      );
    });
  }

  getCardsBySearch(cardName: string): Observable<any[]> {
    return this.getCachedData(`search_${cardName}`, () => {
      const headers = this.getHeaders();
      return this.http.get<any[]>(`${this.baseUrl}cards/search/${cardName}`, { headers }).pipe(
        catchError((error) => {
          console.error('Error fetching cards by search:', error);
          return of([]);
        })
      );
    });
  }

  getCardById(cardId: string): Observable<any> {
    return this.getCachedData(cardId, () => {
      const headers = this.getHeaders();
      return this.http.get<any[]>(`${this.baseUrl}cards/${cardId}`, { headers }).pipe(
        map((cards: any) => {
          const matchingCard = cards.find((card: any) => card.cardId === cardId);
          return matchingCard || null;
        }),
        catchError((error) => {
          console.error('Error fetching card by ID:', error);
          return of(null);
        })
      );
    });
  }

  private getCachedData(key: string, fetchData: () => Observable<any>): Observable<any> {
    if (this.cardCache[key]) {
      return of(this.cardCache[key]);
    } else {
      return fetchData().pipe(
        tap((data) => {
          this.cardCache[key] = data;
        })
      );
    }
  }

  private extractCollectibleCards(data: any): any[] {
    if (Array.isArray(data)) {
      return data.filter((card: any) => card.collectible);
    } else if (typeof data === 'object') {
      return Object.values(data).filter((card: any) => card.collectible);
    }
    return [];
  }

  private getHeaders(): any {
    return {
      'X-RapidAPI-Key': '3097219f87mshbbc7ee12bcd9895p1679d9jsn2db0f73c90dc',
      'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    };
  }
}
