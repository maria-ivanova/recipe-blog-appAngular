import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { IndexInfoComponent } from './index-info/index-info.component';
import { IndexBannerComponent } from './index-banner/index-banner.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    TopmenuComponent,
    SearchPageComponent,
    SearchFormComponent,
    MobileMenuComponent,
    IndexInfoComponent,
    IndexBannerComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    TopmenuComponent,
    SearchPageComponent,
    SearchFormComponent,
    MobileMenuComponent,
    IndexInfoComponent,
    IndexBannerComponent,
    HomeComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
