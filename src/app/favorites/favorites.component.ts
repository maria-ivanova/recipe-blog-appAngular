import { Component, OnInit } from '@angular/core';

import { UserAuthService } from '../../services/firebase.auth.service';
import { FirebaseRequestsService } from '../../services/firebase.requests.service';
import { IRecipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  itemsList: IRecipe[];
  currentUser: any;

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
          .filter(el => el.likes !== 0)
          .filter(el => el['likesArr'].includes(this.currentUser.uid));
        }
      })
    })
  }

  ngOnInit(): void {
    this.getAllItems();
  }

}
