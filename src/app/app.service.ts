import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  headers: HttpHeaders = new HttpHeaders().set(
    'Access-Control-Allow-Origin',
    '*'
  );
}
