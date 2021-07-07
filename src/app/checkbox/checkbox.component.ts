import { Component, Input } from '@angular/core';

import { AppHttp } from '../service/app.http';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})

export class CheckboxComponent {
  
  @Input() task!: CheckboxComponent;

  constructor ( private httpService: AppHttp){}

  id: number = 0;
  text: string = "";
  is_completed: boolean = false;
  category_id: number = 0;

  changeValue() {
    this.httpService.patch(this.task.category_id, this.task.id, !this.task.is_completed).subscribe(response => {
      this.task = response
    });
  }
}
