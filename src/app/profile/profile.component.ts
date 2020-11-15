import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { firebaseErrors, customErrors } from '../../constants/errors';
import { UserAuthService } from '../../services/firebase.auth.service';
import ROUTES from '../../constants/routes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    'username': new FormControl({ value: '', disabled: true }),
    'email': new FormControl({ value: '', disabled: true }),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'rePassword': new FormControl('')
  })

  customErrors = customErrors;
  errorMsg: string = '';
  currentUser: any;

  constructor(public userAuthService: UserAuthService, private router: Router, private toastr: ToastrService) {
  }

  get loggedUser() {
    return this.userAuthService.user;
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
  }

}
