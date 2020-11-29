import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ItemsListComponent } from './items-list/items-list.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { ListPageComponent } from '../shared/list-page/list-page.component';


@NgModule({
  declarations: [
    ItemsListComponent,
    SingleItemComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    ItemsListComponent,
    SingleItemComponent,
    ListPageComponent
  ]
})
export class SharedModule { }
