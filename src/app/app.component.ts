import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private active_page: string = 'dashboard';
  public is_authorize: boolean = false;

  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.init();
  }
  public async init() {
    if (localStorage.getItem('token')) {
      await this.auth.autorizationByToken().subscribe((user) => {
        this.is_authorize = user.id ? true : false;
        this.active_page = 'dashboard';
      });
    } else {
      this.is_authorize = false;
    }
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
