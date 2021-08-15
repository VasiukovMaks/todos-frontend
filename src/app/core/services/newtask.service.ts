import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { Checkbox } from '../models/checkbox.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NewTaskService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  public create_category(title: string): Observable<Card> {
    const url: string = environment.apiURL + 'categories';
    const body: object = { title: title, user: this.authService.user.id };
    return this.httpClient
      .post(url, body, { headers: this.apiService.getHeaders() })
      .pipe(map((res: Object) => plainToClass(Card, res)));
  }

  public create_task(id: number, text: string): Observable<Checkbox> {
    const url: string = environment.apiURL + 'tasks';
    return this.httpClient
      .post(
        url,
        { category: id, text: text },
        { headers: this.apiService.getHeaders() }
      )
      .pipe(map((res: Object) => plainToClass(Checkbox, res)));
  }
}
