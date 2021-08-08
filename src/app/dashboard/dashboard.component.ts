import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public cards: Card[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.get().subscribe((cards: Card[]) => {
      this.cards = cards;
    });
  }

  public identificate(index: number): number {
    return index;
  }

  public async deleteCard(id: number) {
    try {
      await this.dashboardService.delete_category(id).subscribe();
      this.cards = this.cards.filter((card) => card.id !== id);
    } catch {
      console.log('error');
    }
  }
}
