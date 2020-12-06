import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { firebaseErrors, customErrors } from '../../../constants/errors';
import { UserAuthService } from '../../../services/firebase.auth.service';
import ROUTES from '../../../constants/routes';
import { rePasswordValidatorFactory } from 'src/app/shared/validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)])

  profileForm = new FormGroup({
    'username': new FormControl({ value: '', disabled: true }),
    'email': new FormControl({ value: '', disabled: true }),
    'password': this.passwordControl,
    'rePassword': new FormControl('', [Validators.required, rePasswordValidatorFactory(this.passwordControl)])
  })

  customErrors = customErrors;
  errorMsg: string = '';
  currentUser: any;

  constructor(
    public userAuthService: UserAuthService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  setLoggedUserInfo() {
    this.profileForm.controls.username.setValue(this.userAuthService.user.displayName);
    this.profileForm.controls.email.setValue(this.userAuthService.user.email);
  }

  updateUser() {
    this.currentUser = this.profileForm.value;

    if (this.currentUser.password === '' || this.currentUser.rePassword === '') {
      this.errorMsg = customErrors['requiredFields'];
      return;
    }

    if (this.currentUser.password !== this.currentUser.rePassword) {
      this.errorMsg = customErrors['matchingPasswords'];
      return;
    }

    this.userAuthService.passwordUpdate(this.currentUser.password)
      .then(() => {
        this.toastr.success('Успешна промяна на парола!');
        this.errorMsg = '';
        
        this.userAuthService.logoutUser();
        this.router.navigate([ROUTES.LOGIN]);
      })
      .catch(err => {
        if (err.code === 'auth/requires-recent-login') {
          this.toastr.error(firebaseErrors[err.code]);
          this.userAuthService.logoutUser();
          this.router.navigate([ROUTES.LOGIN]);

        }else {
          this.errorMsg = firebaseErrors[err.code] || customErrors['failedChangePassword'];
        }
      })
  }

  get getFormControls() {
    return this.profileForm.controls;
  }

  ngOnInit(): void {
    this.setLoggedUserInfo();
  }

}
