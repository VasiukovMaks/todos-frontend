import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';

import { plainToClass } from 'class-transformer';
import { Card, Checkbox } from "../custom-classes/app.custom.classes";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})


export class AppHttp {

    constructor (private http: HttpClient){}
    
    headers: HttpHeaders = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')

        
    public get(): Observable<Card[]> {
        return this.http.get(environment.apiURL + 'projects', {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Card, res as Card[]))
        )
    }

    public patch(id_category: number, id_task: number, isCompleted: boolean): Observable<Checkbox> {
        return this.http.patch(environment.apiURL + 'projects/' + id_category + "/todo/"+ id_task, {is_completed: isCompleted}, {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Checkbox, res))
        )
    }

    public post_category(id: number, title: string, text: string): Observable<Card> {
        return this.http.post(environment.apiURL + 'todos', {id: id, title: title, text: text}, {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Card, res))
        )
    }

    public post_task(id: number, text: string): Observable<Checkbox> {
        return this.http.post(environment.apiURL + 'new-task', {category_id: id, text: text}, {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Checkbox, res))
        )
    }
}