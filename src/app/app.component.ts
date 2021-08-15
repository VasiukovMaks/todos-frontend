import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.is_authorize = true;
    }
  }
  private active_page: string = 'dashboard';
  public is_authorize: boolean = false;

  public activate_page(page: string) {
    this.active_page = page;
  }

  public get is_dashboard() {
    return this.active_page === 'dashboard';
  }

  public get is_settings() {
    return this.active_page === 'settings';
  }

  public authorized(flag: boolean) {
    this.is_authorize = flag;
  }
}
