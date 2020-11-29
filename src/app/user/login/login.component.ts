import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { firebaseErrors, customErrors } from '../../../constants/errors';

import { UserAuthService } from '../../../services/firebase.auth.service';
import { ILogin } from '../../../interfaces/login.interface';
import ROUTES from '../../../constants/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required]),
  })

  title: string = 'Вход';
  ROUTES = ROUTES;
  customErrors = customErrors;
  user: ILogin;
  errorMsg: string = '';


  constructor(public userAuthService: UserAuthService, private router: Router) { }

  login() {
    this.user = this.loginForm.value;

    if(this.user.email === '' || this.user.password === '') {
      this.errorMsg = customErrors['requiredFields'];
      return;
    }

    this.userAuthService.loginUser(this.user.email, this.user.password)
      .then(response => {
        this.router.navigate([ROUTES.HOME]);
      })
      .catch(err => {
        this.errorMsg = customErrors['wrongUserPassword']
      })
  }

  get getFormControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

}
