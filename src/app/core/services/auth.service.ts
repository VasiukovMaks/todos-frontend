import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseWithToken } from '../../pages/auth/auth.component';
import { User } from '../models/user.model';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public user: User = new User();

  public set_user(user: User) {
    this.user = user;
  }

  headers: HttpHeaders = new HttpHeaders().set(
    'Access-Control-Allow-Origin',
    '*'
  );

  public registery(
    email: string,
    pass: string,
    name: string
  ): Observable<Object> {
    const body = { email: email, pass: pass, fname: name };
    const url: string = environment.apiURL + 'users';
    return this.httpClient.post(url, body, { headers: this.headers }).pipe(
      map((res: Object) => {
        this.set_user(plainToClass(User, res));
        return this.user;
      })
    );
  }

  public login(email: string, pass: string): Observable<ResponseWithToken> {
    const body = { email: email, password: pass };
    const url: string = environment.apiURL + 'auth';
    return this.httpClient.post(url, body, { headers: this.headers }).pipe(
      map((res: any) => {
        this.set_user(plainToClass(User, res.user));
        return res;
      })
    );
  }

  public logout(): void {
    localStorage.clear();
  }
}
