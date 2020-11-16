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
import { environment } from '../environments/environment';

import { UserAuthService } from '../services/firebase.auth.service';
import { FirebaseRequestsService } from '../services/firebase.requests.service';

import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { HomeComponent } from './home/home.component';
import { IndexBannerComponent } from './index-banner/index-banner.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { IndexInfoComponent } from './index-info/index-info.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailsComponent } from './details/details.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    SearchFormComponent,
    MobileMenuComponent,
    TopmenuComponent,
    HomeComponent,
    IndexBannerComponent,
    ItemsListComponent,
    SingleItemComponent,
    IndexInfoComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ListPageComponent,
    DetailsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [UserAuthService, FirebaseRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faChevronDown, faUser, faHeart, faUpload, faTimes, faEdit, faBars);
  }
}
