import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { Checkbox } from '../checkbox/checkbox.model';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CheckboxService {
  constructor(private httpClient: HttpClient, private apiService: ApiService) {}

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
        { headers: this.apiService.getHeaders() }
      )
      .pipe(map((res: Object) => plainToClass(Checkbox, res)));
  }
}
