import { Component, OnInit } from '@angular/core';

import { AppHttp } from './service/app.http';
import { Card } from './custom-classes/app.custom.classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  todosData: Card[] = [];
  constructor (private httpService: AppHttp){}

  ngOnInit():void {
    this.httpService.get().subscribe((data: Card[]) => {
      this.todosData = data
      })
  }

  identificate(index: number, item: Card):number {
    return item.id
  }
}
