import { Component, OnInit } from '@angular/core';

import { AppHttp } from './service/app.http';
import { plainToClass } from 'class-transformer';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

export interface Card {
  id: number
  title: string
  tasks: CheckboxComponent[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  todosData: Card[] = [];
  
  constructor (private httpService: AppHttp){}

  ngOnInit() {
    this.httpService.get().subscribe(todos => {
      let response: any = todos;
      for (let category of response) {
        this.todosData.push(plainToClass(CardComponent, category))
      }
    });
  }
}
