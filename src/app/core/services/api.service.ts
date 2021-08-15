import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  private token: string | null = '';
  private get get_token(): string | null {
    return this.token;
  }

  private headers: HttpHeaders = new HttpHeaders().set(
    'Access-Control-Allow-Origin',
    '*'
  );

  public getHeaders(): HttpHeaders {
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    this.headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.get_token
    );
    return this.headers;
  }
}
