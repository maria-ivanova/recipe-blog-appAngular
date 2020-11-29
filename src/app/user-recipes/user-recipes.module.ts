import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { MySingleItemComponent } from './my-single-item/my-single-item.component';


@NgModule({
  declarations: [
    FavoritesComponent,
    MyItemsComponent,
    MySingleItemComponent 
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    FavoritesComponent,
    MyItemsComponent,
    MySingleItemComponent 
  ]
})
export class UserRecipesModule { }
