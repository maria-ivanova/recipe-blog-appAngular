import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class UserAuthService {
    constructor(private firebaseAuth:  AngularFireAuth) {
    }

    sharedUser: {};

    registerUser(email, password) {
        return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    loginUser(email, password) {
        return this.firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    logoutUser() {
        return this.firebaseAuth.signOut();
    };

    
}