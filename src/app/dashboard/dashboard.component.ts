import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../core/models/card.model';
import { NewtaskComponent } from '../newtask/newtask.component';
import { DashboardService } from '../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public cards: Card[] = [];

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}

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

  public addTask() {
    this.dialog.open(NewtaskComponent, { data: this.cards });
  }
}
