import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../..';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  userData: [] = [];
  loginForm!: FormGroup;
  userName!: FormControl;
  password!: FormControl;
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {
    this.initFormControl();
    this.createForm();
  }

  initFormControl() {
    this.userName = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ])
    );
    this.password = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])
    );
  }
  createForm() {
    this.loginForm = new FormGroup({
      userName: this.userName,
      password: this.password,
    });
  }

  onSubmitLoginForm() {
    this.authService.login(this.loginForm.value).subscribe((user: any) => {
      if (user) {
        this.userData = user;
        if (user.status === 'Failure') {
          this._snackBar.open(user.error, 'close', {
            duration: 3500,
          });
        }

        localStorage.setItem('user', JSON.stringify(user.User));
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {}
  // routeToApp() {
  //   this.router.navigate(['/']);
  // }

  // UdateUserSuucessFuly() {
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'you update employee Successfly',
  //     detail: 'تم تحديث الموظف بنجاح',
  //   });
  // }
  // ErrorInUpdateUser() {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: '‘User Name Is Already Exist',
  //     detail: 'اسم المستخدم موجود بالفعل مسبقا',
  //   });
  // }
}
