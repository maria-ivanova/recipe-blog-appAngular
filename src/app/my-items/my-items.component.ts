import { Component, OnInit } from '@angular/core';

import { UserAuthService } from '../../services/firebase.auth.service';
import { FirebaseRequestsService } from '../../services/firebase.requests.service';
import { IRecipe } from '../../interfaces/recipe.interface';
import ROUTES from '../../constants/routes';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.css']
})
export class MyItemsComponent implements OnInit {
  itemsList: IRecipe[];
  currentUser: any;
  ROUTES = ROUTES;

  constructor(
    public userAuthService: UserAuthService,
    public firebaseRequestsService: FirebaseRequestsService
  ) { }

  getAllItems() {
    this.userAuthService.activeUser().subscribe(data => {
      this.currentUser = data;

      this.firebaseRequestsService.getData().subscribe(data => {

        if (data) {
          this.itemsList = Object.keys(data).map(key => {
            return {
              id: key,
              ...data[key]
            }
          })
          .filter(el => el['creatorId'] === this.currentUser.uid)
          .sort((a, b) => b['createdDate'] - a['createdDate']);
        }
      })
     
    })
  }

  deleteHandle(itemId) {
    this.getAllItems();
  }

  ngOnInit(): void {
    this.getAllItems();
  }
}
