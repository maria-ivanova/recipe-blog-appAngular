import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthService } from '../../services/firebase.auth.service';
import ROUTES from '../../constants/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ROUTES = ROUTES;

  constructor(public userAuthService: UserAuthService, private router: Router ) { }

  get loggedUser() {
    return this.userAuthService.user;
  }

  logout() {
    this.userAuthService.logoutUser();
  }
  
  ngOnInit(): void {
  }

}
