import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {take, map, tap} from 'rxjs/operators';

import { UserAuthService } from '../../services/firebase.auth.service';
import ROUTES from '../../constants/routes';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  ROUTES = ROUTES;

  constructor(
    public userAuthService: UserAuthService, 
    private router: Router
    ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.userAuthService.activeUser().pipe(
        map(user => !! user),
        tap(
          isLoggedIn => {
            if(isLoggedIn) {
              return true;
            }

            this.router.navigate([ROUTES.HOME]);
            return false;
          }
        )
      )
  }
}
