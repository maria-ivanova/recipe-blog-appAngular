import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { IsLoggedIn } from './auth/isLoggedIn';

import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ListPageComponent } from './shared/list-page/list-page.component';
import { DetailsComponent } from './recipes/details/details.component';
import { EditComponent } from './recipes/edit/edit.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { CreateComponent } from './recipes/create/create.component';
import { MyItemsComponent } from './user-recipes/my-items/my-items.component';
import { FavoritesComponent } from './user-recipes/favorites/favorites.component';
import { SearchPageComponent } from './core/search-page/search-page.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
  { path: 'recipes/:category', component:  ListPageComponent },
  { path: 'details/:id', component:  DetailsComponent },
  { path: 'edit/:id', component:  EditComponent, canActivate: [ AuthGuard ] },
  { path: 'create', component: CreateComponent, canActivate: [ AuthGuard ] },
  { path: 'myRecipes', component: MyItemsComponent, canActivate: [ AuthGuard ] },
  { path: 'myFavorites', component: FavoritesComponent, canActivate: [ AuthGuard ] },
  { path: 'search', component: SearchPageComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
