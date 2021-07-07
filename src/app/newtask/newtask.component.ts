import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CardComponent } from '../card/card.component';
import { AppHttp } from '../service/app.http';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  displayInput: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CardComponent[],
    private httpService: AppHttp,
    private dialog: MatDialog
    ) { }

  taskReactiveForm: FormGroup = this.fb.group({});

  ngOnInit():void {
    this.initForm();
  }


  initForm():void{
    this.taskReactiveForm = this.fb.group({
     task: ["Название задачи...", [
      Validators.required,
      Validators.minLength(3)
     ]],
     category: ["", [
      Validators.required,
     ]],
     newСategory: ["Название категории...", [
      Validators.required,
      Validators.minLength(3)
     ]]
    });
   }


   checkSelect():void {
     const controls = this.taskReactiveForm.controls;
     if (controls.category.value === this.data.length + 1 && !this.displayInput) {
      this.displayInput = !this.displayInput;
    }
      else if (controls.category.value !== this.data.length + 1 && this.displayInput) {
        this.displayInput = !this.displayInput
     }
   }
   

  isControlInvalid(controlName: string): boolean {
    const control = this.taskReactiveForm.controls[controlName];
    const result: boolean = control.status === "INVALID" && control.touched;
    return result;
    }
  isControlNewCategoryInvalid():boolean {
    const control = this.taskReactiveForm.controls
    
    if (!this.displayInput) {
      this.taskReactiveForm.controls.newСategory.setValue('Новая категория...')
      return false}

    return control.newСategory.status === "INVALID" && control.newСategory.touched
  }


  onSubmit() {
    const controls = this.taskReactiveForm.controls;
    
    if (this.taskReactiveForm.status === "INVALID") {
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    let requestTitle: string = this.displayInput ? controls.newСategory.value : this.data[controls.category.value - 1].title;
    this.httpService.post(controls.category.value, requestTitle, controls.task.value)
      .subscribe(response => {this.data[controls.category.value - 1] = response})
    
    this.dialog.closeAll()
   }
}
