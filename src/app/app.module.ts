import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faUser, faHeart, faUpload, faTimes, faEdit, faBars } from '@fortawesome/free-solid-svg-icons';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { UserAuthService } from '../services/firebase.auth.service';
import { FirebaseRequestsService } from '../services/firebase.requests.service';
import { SearchstateService } from '../services/search.state.service';
import { IsLoggedIn } from './auth/isLoggedIn';

import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { RecipesModule } from './recipes/recipes.module';
import { UserRecipesModule  } from './user-recipes/user-recipes.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    UserModule,
    RecipesModule,
    UserRecipesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [UserAuthService, FirebaseRequestsService, SearchstateService, IsLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faChevronDown, faUser, faHeart, faUpload, faTimes, faEdit, faBars);
  }
}
