import { Component, OnInit } from '@angular/core';

import { AppHttp } from './service/app.http';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  todosData: CardComponent[] = [];
  constructor (private httpService: AppHttp){}

  ngOnInit() {
    this.httpService.get().subscribe((data: CardComponent[]) => {
      this.todosData = data
      })
  }

  identificate(index: number, item: CardComponent):number {
    return item.id
  }
}
