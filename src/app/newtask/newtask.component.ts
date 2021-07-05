import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CardComponent } from '../card/card.component';
import { AppHttp } from '../service/app.http';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { classToPlain, plainToClass } from 'class-transformer';


@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {


  displayInput: boolean = false;
  textValue: string = "";
  categoryValue: string = "";
  selectValue: string= "";

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CardComponent[],
    private httpService: AppHttp,
    private dialog: MatDialog
    ) { }

  taskReactiveForm: FormGroup = this.fb.group({});

  ngOnInit() {
    this.initForm();
  }


  initForm(){
    this.taskReactiveForm = this.fb.group({
     name: [null],
     category: [null],
     newcategory: [null]
    });
   }


   checkSelect() {
     if (this.selectValue === "Новая категория..." && !this.displayInput) {
      this.displayInput = !this.displayInput;
    }
      else if (this.selectValue !== "Новая категория..." && this.displayInput) {
        this.displayInput = !this.displayInput
     }
   }


   newTask() {
    this.selectValue = this.selectValue === "Новая категория..."? this.categoryValue : this.selectValue;
    this.httpService.post(this.selectValue, this.textValue).subscribe(response => {
      let resp: any = response
      if (resp.id) {
        this.dialog.closeAll()
        if (this.selectValue === this.categoryValue) {
          this.data.push(plainToClass(CardComponent, resp))
        } else {
          for (let i=0; i<this.data.length; i++) {
            console.log(resp)
            if (this.data[i].id == resp.id) {
              this.data[i] = plainToClass(CardComponent, resp);
              console.log(this.data)
              break
            }
          }
        }
      }
    });
   }
}
