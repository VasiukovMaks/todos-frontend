import { Component, Input } from '@angular/core';
import { NewtaskComponent } from '../newtask/newtask.component';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../card/card.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() todosData: Card[] = [];

  public activeTab: string = 'DASHBOARD';
  public colorButton: {
    dashboard: string;
  } = {
    dashboard: 'white',
  };

  constructor(private dialog: MatDialog) {}

  openWindow() {
    this.dialog.open(NewtaskComponent, { data: this.todosData });
  }

  changeTab(tabsType: string) {
    this.activeTab = tabsType;
    this.colorButton.dashboard =
      this.colorButton.dashboard === 'black' ? 'white' : 'black';
  }
}
