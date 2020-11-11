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

  constructor(public userAuthService: UserAuthService, private router: Router ) { }

  logout() {
    this.userAuthService.logoutUser();
    this.router.navigate([ROUTES.HOME]);
  }
  

  ngOnInit(): void {
  }

}
