import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { Card } from '../card/card.model';
import { Checkbox } from '../checkbox/checkbox.model';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class NewTaskService {
  constructor(private httpClient: HttpClient, private apiService: ApiService) {}

  public create_category(title: string): Observable<Card> {
    const url: string = environment.apiURL + 'categories';
    return this.httpClient
      .post(url, { title: title }, { headers: this.apiService.getHeaders() })
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
