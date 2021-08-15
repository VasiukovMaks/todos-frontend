import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseWithToken } from './auth.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders().set(
    'Access-Control-Allow-Origin',
    '*'
  );

  public registery(
    email: string,
    pass: string,
    name: string
  ): Observable<Object> {
    const body = { email: email, password: pass, fname: name };
    const url: string = environment.apiURL + 'auth';
    return this.httpClient
      .post(url, body, { headers: this.headers })
      .pipe(map((res: Object) => res));
  }

  public login(email: string, pass: string): Observable<ResponseWithToken> {
    const body = { email: email, password: pass };
    const url: string = environment.apiURL + 'auth';
    return this.httpClient
      .post(url, body, { headers: this.headers })
      .pipe(map((res: any) => res));
  }
}
