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
        const url: string = environment.apiURL + 'projects';
        return this.http.get(url, {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Card, res as Card[]))
        )
    }

    public patch(id_category: number, id_task: number, isCompleted: boolean): Observable<Checkbox> {
        const url: string = environment.apiURL + 'projects/' + id_category + "/todo/"+ id_task;
        return this.http.patch(url, {is_completed: isCompleted}, {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Checkbox, res))
        )
    }

    public post_category(id: number, title: string, text: string): Observable<Card> {
        const url: string = environment.apiURL + 'category';
        return this.http.post(url, {id: id, title: title, text: text}, {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Card, res))
        )
    }

    public delete_category(id: number): Observable<unknown> {
        const url: string = environment.apiURL + 'category/' + id;
        return this.http.delete(url, {'headers': this.headers})
            .pipe(
        )
    }

    public post_task(id: number, text: string): Observable<Checkbox> {
        const url: string = environment.apiURL + 'task';
        return this.http.post(url, {category_id: id, text: text}, {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Checkbox, res))
        )
    }

    public delete_task(id: number): Observable<Checkbox> {
        const url: string = environment.apiURL + 'task';
        return this.http.post(url, {category_id: id}, {'headers': this.headers})
        .pipe(
            map((res: Object) => plainToClass(Checkbox, res))
        )
    }
}