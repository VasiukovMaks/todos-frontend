import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';

import { CardComponent } from "../card/card.component";
import { plainToClass } from 'class-transformer';
import { CheckboxComponent } from "../checkbox/checkbox.component";


@Injectable({
    providedIn: 'root'
})


export class AppHttp {

    constructor (private http: HttpClient){}
    
    headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')

        
    public get(){
        return this.http.get(environment.apiURL + 'projects', {'headers': this.headers})
        .pipe(
            map(res => plainToClass(CardComponent, res as Object[]))
        )
    }

    public patch(id_category: number, id_task: number, isCompleted: boolean) {
        return this.http.patch(environment.apiURL + 'projects/' + id_category + "/todo/"+ id_task, {is_completed: isCompleted}, {'headers': this.headers})
        .pipe(
            map(res => plainToClass(CheckboxComponent, res))
        )
    }

    public post(id: number, title: string, text: string) {
        return this.http.post(environment.apiURL + 'todos', {id: id, text: text, title: title}, {'headers': this.headers})
        .pipe(
            map(res => plainToClass(CardComponent, res))
        )
    }
}