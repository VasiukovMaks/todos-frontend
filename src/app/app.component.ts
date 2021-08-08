import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private active_page: string = 'dashboard';

  public activate_page(page: string) {
    this.active_page = page;
  }

  public get is_dashboard() {
    return this.active_page === 'dashboard';
  }

  public get is_settings() {
    return this.active_page === 'settings';
  }
}
