import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewtaskComponent } from '../newtask/newtask.component';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../card/card.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() active_page: EventEmitter<string> = new EventEmitter<string>();

  public activeTab: string = 'dashboard';
  public tabs: { [tab_name: string]: { color: string; active: boolean } } = {
    dashboard: {
      color: 'white',
      active: true,
    },
    analytics: {
      color: 'black',
      active: false,
    },
    teams: {
      color: 'black',
      active: false,
    },
    documents: {
      color: 'black',
      active: false,
    },
    settings: {
      color: 'black',
      active: false,
    },
  };

  constructor(private dialog: MatDialog) {}

  public changeTab(tabsType: string) {
    if (this.activeTab !== 'dashboard' && tabsType === 'dashboard') {
      // this.openWindow();
    }
    this.tabs[`${this.activeTab}`].color = 'black';
    this.tabs[`${tabsType}`].color = 'white';
    this.tabs[`${this.activeTab}`].active = false;
    this.tabs[`${tabsType}`].active = true;
    this.activeTab = tabsType;

    this.active_page.emit(tabsType);
  }
}
