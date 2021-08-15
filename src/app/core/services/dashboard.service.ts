import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private auth: AuthService
  ) {}

  public get(): Observable<Card[]> {
    const params: HttpParams = new HttpParams().set(
      'userId',
      this.auth.user.id.toString()
    );
    const url: string = environment.apiURL + 'categories';
    return this.httpClient
      .get(url, { headers: this.apiService.getHeaders(), params: params })
      .pipe(map((res: Object) => plainToClass(Card, res as Card[])));
  }

  public delete_category(id: number): Observable<unknown> {
    const url: string = environment.apiURL + 'categories/' + id;
    return this.httpClient.delete(url, {
      headers: this.apiService.getHeaders(),
    });
  }
}
