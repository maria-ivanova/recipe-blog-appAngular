import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserAuthService {
    private authState: any;

    constructor(private firebaseAuth: AngularFireAuth) {
            this.firebaseAuth.authState.subscribe((auth) => {
            this.authState = auth
        });
    }

    activeUser() {
        return this.firebaseAuth.authState;
    }

    registerUser(email, password) {
        return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    loginUser(email, password) {
        return this.firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    logoutUser() {
        return this.firebaseAuth.signOut();
    };

    passwordUpdate(newPassword) {
        return this.firebaseAuth.currentUser.then(data => data.updatePassword(newPassword));
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }
    
    get user(): any {
        return this.authenticated ? this.authState : null;
    }
}