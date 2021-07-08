import { Component, Input } from '@angular/core';
import { Checkbox } from '../custom-classes/app.custom.classes';

import { AppHttp } from '../service/app.http';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})

export class CheckboxComponent {
  
  @Input() task: Checkbox = {id: 0, text:"", is_completed: false, category_id: 0};

  constructor ( private httpService: AppHttp){}

  changeValue():void {
    this.httpService.patch(this.task.category_id, this.task.id, !this.task.is_completed)
    .subscribe((response :Checkbox) => {
      this.task = response
    });
  }
}
