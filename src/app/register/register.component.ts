import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customErrors } from '../../constants/errors';

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

register() {
  console.log(this.registerForm);
  console.log(this.registerForm.get('username').value);

  

}

get getFormControls() {
  return this.registerForm.controls;
}

  constructor() { }

  ngOnInit(): void {
  }

}
