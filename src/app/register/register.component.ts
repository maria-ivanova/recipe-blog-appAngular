import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { firebaseErrors, customErrors } from '../../constants/errors';

import { UserAuthService } from '../../services/firebase.auth.service';
import { RegisterModel } from '../../models/register.model';
import ROUTES from '../../constants/routes';

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
model: RegisterModel;
errorMsg: string = '';

  constructor(public userAuthService: UserAuthService, private router: Router ) { }

  register() {
    this.model = this.registerForm.value;

    if(this.model.username === '' || this.model.email === '' || this.model.password === '' || this.model.rePassword === '') {
      this.errorMsg = customErrors['requiredFields'];
      return;
    }

    if(this.model.password !== this.model.rePassword) {
      this.errorMsg = customErrors['matchingPasswords'];
      return;
    }

    this.userAuthService.registerUser(this.model.email, this.model.password)
      .then(response => {
        response.user.updateProfile({
          displayName: this.model.username
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
