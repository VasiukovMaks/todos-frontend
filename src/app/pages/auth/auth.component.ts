import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  public isSignUp: boolean = false;
  public registoryForm: FormGroup = this.formBuilder.group({});

  private initForm() {
    this.registoryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$'),
        ],
      ],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$'),
        ],
      ],
      rules: [false, [Validators.requiredTrue]],
    });
  }

  public onSubmit() {
    console.log('Submit');
  }

  public changeTab(): void {
    this.isSignUp = !this.isSignUp;
  }
}
