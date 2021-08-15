import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private active_page: string = 'dashboard';
  public is_authorize: boolean = false;
  ngOnInit() {
    this.init();
  }
  public init() {
    this.is_authorize = localStorage.getItem('token') ? true : false;
    this.active_page = 'dashboard';
  }

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
