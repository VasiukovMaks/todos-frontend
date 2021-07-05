import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AppHttp {

    constructor (private http: HttpClient){}
    
    headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
    public get() {
       return this.http.get('https://quiet-journey-25226.herokuapp.com/projects', {'headers': this.headers});
    }
    public patch(id_category: number, id_task: number, isCompleted: boolean) {
        return this.http.patch('https://quiet-journey-25226.herokuapp.com/projects/' + id_category + "/todo/"+ id_task, {is_completed: isCompleted}, {'headers': this.headers});
    }
    public post(title: string, text: string) {
        return this.http.post('https://quiet-journey-25226.herokuapp.com/todos', {text: text, isCompleted: false, title: title}, {'headers': this.headers});
    }
}