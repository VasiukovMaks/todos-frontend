import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';

export interface ResponseWithToken {
  access_token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  public registoryForm: FormGroup = this.formBuilder.group({});
  public loginForm: FormGroup = this.formBuilder.group({});
  @Output() authorized: EventEmitter<any> = new EventEmitter();

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
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
    });
  }
  public onSubmit() {
    const controls: { [key: string]: AbstractControl } =
      this.registoryForm.controls;
    if (this.registoryForm.status === 'INVALID') {
      return;
    }
    this.authService
      .registery(controls.email.value, controls.pass.value, controls.name.value)
      .subscribe((resp) => console.log(resp));
  }
  public login() {
    const controls: { [key: string]: AbstractControl } =
      this.loginForm.controls;
    console.log(controls);
    if (this.loginForm.status === 'INVALID') {
      return;
    }
    this.authService
      .login(controls.email.value, controls.pass.value)
      .subscribe((resp: ResponseWithToken) => {
        localStorage.setItem('token', resp.access_token);
        this.authorized.emit(true);
      });
  }
}
