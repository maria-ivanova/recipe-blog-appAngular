import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take, map, tap } from 'rxjs/operators';

import { UserAuthService } from '../../services/firebase.auth.service';
import ROUTES from '../../constants/routes';

@Injectable()
export class IsLoggedIn {
    ROUTES = ROUTES;

    constructor(
        public userAuthService: UserAuthService,
        private router: Router
    ) { }

    resolve(): void {
        this.userAuthService.activeUser().pipe(
            take(1),
            map(user => !!user),
            tap(
                isLoggedIn => {
                    if (isLoggedIn) {
                        this.router.navigate([ROUTES.PROFILE]);
                    }
                }
            )
        ).subscribe();
    }
}