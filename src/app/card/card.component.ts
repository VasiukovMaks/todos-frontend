import { Component, Input, OnInit } from '@angular/core';

import { Card } from '../app.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { plainToClass } from 'class-transformer';

export class Task {
  id: number = 0;
  text: string = "";
  is_completed: boolean = false;
  category_id: number = 0;
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @Input() card?: Card;

  tasksData: Task[] = [];

  constructor(){
  }

  id: number = 0;
  title: string = "";
  tasks: CheckboxComponent[] = []; 

  ngOnInit() {
    if (this.card?.tasks) {
      for (let task of this.card?.tasks){
        this.tasksData.push(plainToClass(CheckboxComponent, task))
    }}
  }
}