import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../core/models/card.model';
import { Checkbox } from '../core/models/checkbox.model';
import { NewTaskService } from '../core/services/newtask.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css'],
})
export class NewtaskComponent implements OnInit {
  displayInput: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Card[],
    private httpService: NewTaskService,
    private dialog: MatDialog
  ) {}

  taskReactiveForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taskReactiveForm = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      newСategory: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  checkSelect(): void {
    const controls: { [key: string]: AbstractControl } =
      this.taskReactiveForm.controls;
    if (controls.category.value === 0 && !this.displayInput) {
      this.displayInput = !this.displayInput;
    } else if (controls.category.value !== 0 && this.displayInput) {
      this.displayInput = !this.displayInput;
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control: AbstractControl =
      this.taskReactiveForm.controls[controlName];
    const result: boolean = control.status === 'INVALID' && control.touched;
    return result;
  }
  isControlNewCategoryInvalid(): boolean {
    const control = this.taskReactiveForm.controls;
    if (!this.displayInput) {
      control.newСategory.disable({ onlySelf: true });
      return false;
    }
    control.newСategory.enable({ onlySelf: true });
    return (
      control.newСategory.status === 'INVALID' && control.newСategory.touched
    );
  }

  onSubmit(): void {
    const controls: { [key: string]: AbstractControl } =
      this.taskReactiveForm.controls;

    if (this.taskReactiveForm.status === 'INVALID') {
      Object.keys(controls).forEach((controlName: string) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    if (this.displayInput) {
      this.httpService
        .create_category(controls.newСategory.value)
        .subscribe((responseCard: Card) => {
          this.httpService
            .create_task(responseCard.id, controls.task.value)
            .subscribe((responseCheckbox: Checkbox) => {
              responseCard.tasks.push(responseCheckbox);
              this.data.push(responseCard);
            });
        });
    } else {
      this.httpService
        .create_task(controls.category.value, controls.task.value)
        .subscribe((response: Checkbox) => {
          this.data[
            this.data.findIndex((el) => el.id === controls.category.value)
          ].tasks.push(response);
        });
    }
    this.dialog.closeAll();
  }
}
