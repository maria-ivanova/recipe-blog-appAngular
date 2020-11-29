import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { firebaseErrors, customErrors } from '../../../constants/errors';

import { UserAuthService } from '../../../services/firebase.auth.service';
import { IRegister } from '../../../interfaces/register.interface';
import ROUTES from '../../../constants/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    'username': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'rePassword': new FormControl('')
  })

  customErrors = customErrors;
  user: IRegister;
  errorMsg: string = '';

  constructor(public userAuthService: UserAuthService, private router: Router) { }

  register() {
    this.user = this.registerForm.value;

    if (this.user.username === '' || this.user.email === '' || this.user.password === '' || this.user.rePassword === '') {
      this.errorMsg = customErrors['requiredFields'];
      return;
    }

    if (this.user.password !== this.user.rePassword) {
      this.errorMsg = customErrors['matchingPasswords'];
      return;
    }

    this.userAuthService.registerUser(this.user.email, this.user.password)
      .then(response => {
        response.user.updateProfile({
          displayName: this.user.username
        })

        this.router.navigate([ROUTES.HOME]);
      })
      .catch(err => {
        this.errorMsg = firebaseErrors[err.code] || customErrors['failedRegister'];
      });
  }

  get getFormControls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
  }

}
