import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Card } from '../card/card.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders().set(
    'Access-Control-Allow-Origin',
    '*'
  );

  public get(): Observable<Card[]> {
    const url: string = environment.apiURL + 'categories';
    return this.httpClient
      .get(url, { headers: this.headers })
      .pipe(map((res: Object) => plainToClass(Card, res as Card[])));
  }

  public delete_category(id: number): Observable<unknown> {
    const url: string = environment.apiURL + 'categories/' + id;
    return this.httpClient.delete(url, { headers: this.headers });
  }
}