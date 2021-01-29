import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData ={
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)])
  }

  loginData={email:"",password:""}

  getErrorMessage() {
    if (this.loginUserData.email.hasError('required')) {
      return 'Email is required';
    }
    else if(this.loginUserData.email.hasError('email')){
      return "This doesn't look like an email address";
    }
  }
  getError(){
    if (this.loginUserData.password.hasError('required')) {
      return 'Password is required';
    }
    else if(this.loginUserData.password.hasError('minlength')){
      return 'Password must be a minimum length of 6';
    }
  }

  hide = true;
  
  constructor(private _auth: AuthService,
              private _router: Router,private snackbar:MatSnackBar) { }

  ngOnInit() {
  }

  loginUser () {
    this.loginData.email=this.loginUserData.email.value;
    this.loginData.password=this.loginUserData.password.value;
    this._auth.loginUser(this.loginData)
    .subscribe(
      res => {
        this.snackbar.open('LOGIN SUCCESSFULL', 'OK', {
          duration: 3000,
        });
        localStorage.setItem('token', res.token)
        this._auth.onLogin();
        this._router.navigate(['/view'])
      },
      err => {
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this.snackbar.open('INVALID EMAIL OR PASSWORD', 'OK', {
              duration: 3000,
            });
            this.loginUserData.email.reset();
            this.loginUserData.password.reset();
            this.loginData.email='';
            this.loginData.password='';
          }
        }
      }
    ) 
  }

}
