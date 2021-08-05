import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Card } from './card/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public cards: Card[] = [];
  constructor(private appService: AppService) {}

  public ngOnInit(): void {
    this.appService.get().subscribe((cards: Card[]) => {
      this.cards = cards;
    });
  }

  public identificate(index: number): number {
    return index;
  }

  public async deleteCard(id: number) {
    try {
      await this.appService.delete_category(id).subscribe();
      this.cards = this.cards.filter((card) => card.id !== id);
    } catch {
      console.log('error');
    }
  }
}
