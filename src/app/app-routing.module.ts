import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateComponent } from './create/create.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'recipes/:category', component:  ListPageComponent },
  { path: 'details/:id', component:  DetailsComponent },
  { path: 'edit/:id', component:  EditComponent },
  { path: 'create', component: CreateComponent },
  { path: 'myRecipes', component: MyItemsComponent },
  { path: 'myFavorites', component: FavoritesComponent },
  { path: 'search', component: SearchPageComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
