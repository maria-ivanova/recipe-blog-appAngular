import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserAuthService } from '../../../services/firebase.auth.service';
import { FirebaseRequestsService } from '../../../services/firebase.requests.service';
import { IRecipe } from '../../../interfaces/recipe.interface';
import ROUTES from '../../../constants/routes';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  itemId: string;
  currentItem: IRecipe;
  ROUTES = ROUTES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userAuthService: UserAuthService,
    public firebaseRequestsService: FirebaseRequestsService,
    private toastr: ToastrService
  ) { }

  getInfo() {
    this.firebaseRequestsService.getItemInfo(this.itemId).subscribe(data => {

      if (!data) {
        this.router.navigate([ROUTES.NOT_FOUND]);
        return;
      }

      this.currentItem = data;
    })
  }

  likesHandler() {
    this.currentItem.likes = this.currentItem.likes + 1;

    if(!this.currentItem.likesArr) {
      this.currentItem.likesArr = [];
    }

    this.currentItem.likesArr.push(this.loggedUser.uid);
    
    this.firebaseRequestsService.postEdit(this.itemId, this.currentItem).subscribe(data => {
      this.toastr.success('Успешно добавихте рецептата в любими!');
    })
  }

  get loggedUser() {
    return this.userAuthService.user;
  }

  isLiked(userID: string)  {
    if(this.currentItem?.likesArr?.includes(userID)) {
      return true;
    }
  }

  isCreator(userID: string) {
    if(this.currentItem?.creatorId === userID) {
      return true;
    }
	}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params.id;
    })

    this.getInfo();
  }


}
