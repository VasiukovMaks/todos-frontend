import { Component, Input } from '@angular/core';
import { Checkbox } from '../core/models/checkbox.model';
import { CheckboxService } from '../core/services/checkbox.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent {
  @Input() task: Checkbox = {
    id: 0,
    text: '',
    isCompleted: false,
  };

  constructor(private checkboxService: CheckboxService) {}

  changeValue(): void {
    this.checkboxService
      .patch(this.task.id, this.task.text, !this.task.isCompleted)
      .subscribe((response: Checkbox) => {
        this.task = response;
      });
  }
}
