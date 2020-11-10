import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { firebaseErrors, customErrors } from '../../constants/errors';

import { UserAuthService } from '../../services/firebase.auth.service';
import { LoginModel } from '../../models/login.model';
import ROUTES from '../../constants/routes';

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

  customErrors = customErrors;
  model: LoginModel;
  errorMsg: string = '';


  constructor(public userAuthService: UserAuthService, private router: Router) { }

  login() {
    this.model = this.loginForm.value;

    if(this.model.email === '' || this.model.password === '') {
      this.errorMsg = customErrors['requiredFields'];
      return;
    }

    this.userAuthService.loginUser(this.model.email, this.model.password)
      .then(response => {
        this.userAuthService.sharedUser = response.user;
        this.router.navigate([ROUTES.PROFILE]);
      })
      .catch(err => {
        console.log(this.userAuthService.sharedUser)
        this.errorMsg = customErrors['wrongUserPassword']
      })
  }

  get getFormControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

}
