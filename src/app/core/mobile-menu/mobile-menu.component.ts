import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../services/firebase.auth.service';
import { FirebaseRequestsService } from '../../../services/firebase.requests.service';
import ROUTES from '../../../constants/routes';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {
  isOpen: boolean = false;
  ROUTES = ROUTES;
  allCategories: string[];

  constructor(public userAuthService: UserAuthService, public firebaseRequestsService: FirebaseRequestsService, private router: Router) { }

  get loggedUser() {
    return this.userAuthService.user;
  }

  setOpen() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.userAuthService.logoutUser();
    this.router.navigate([ROUTES.HOME]);
  }

  getAllCategories() {
		this.firebaseRequestsService.getCategories().subscribe(data => {
      this.allCategories = Object.values(data)[0]
    });
	}

  ngOnInit(): void {
    this.getAllCategories()
  }
}
