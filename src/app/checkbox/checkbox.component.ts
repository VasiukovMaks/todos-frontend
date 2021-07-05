import { Component, Input, Optional } from '@angular/core';

import { Task } from '../card/card.component';
import { AppHttp } from '../service/app.http';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  
  @Input() task: Task = {id: 0, text: "", is_completed: false, category_id: 0}

  constructor ( private httpService: AppHttp){}

  id: number = 0;
  text: string = "";
  is_completed: boolean = false;
  category_id: number = 0;

  changeValue() {
    this.httpService.patch(this.task.category_id, this.task.id, !this.task.is_completed).subscribe(response => {
      let resp: any = response
      if (resp.message == "ok") {
        this.task.is_completed = !this.task.is_completed;
      }
    });
  }
}
