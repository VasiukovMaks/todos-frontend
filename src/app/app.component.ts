import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Card } from './card/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cards: Card[] = [];
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.get().subscribe((cards: Card[]) => {
      this.cards = cards;
    });
  }

  identificate(index: number, item: Card): number {
    return item.id;
  }
}
