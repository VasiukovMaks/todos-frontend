import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { Checkbox } from '../checkbox/checkbox.model';

@Injectable({
  providedIn: 'root',
})
export class CheckboxService {
  constructor(private httpClient: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders().set(
    'Access-Control-Allow-Origin',
    '*'
  );

  public patch(
    id_task: number,
    text: string,
    isCompleted: boolean
  ): Observable<Checkbox> {
    const url: string = environment.apiURL + 'tasks/' + id_task;
    return this.httpClient
      .put(
        url,
        { isCompleted: isCompleted, text: text },
        { headers: this.headers }
      )
      .pipe(map((res: Object) => plainToClass(Checkbox, res)));
  }
}
