import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseRequestsService } from '../../../services/firebase.requests.service';
import { SearchstateService } from '../../../services/search.state.service';
import { IRecipe } from '../../../interfaces/recipe.interface';
import ROUTES from '../../../constants/routes';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  searchForm = new FormGroup({
    'search': new FormControl(null),
  })

  itemsList: IRecipe[];

  constructor(
    public firebaseRequestsService: FirebaseRequestsService,
    private searchstateService: SearchstateService,
    private router: Router
    ) { }


  search() {
    const regex = RegExp(this.searchForm.value.search, 'gmi');

    this.firebaseRequestsService.getData().subscribe(data => {

      if (data) {
        this.itemsList = Object.keys(data).map(key => {
          return {
            id: key,
            ...data[key]
          }
        })
        .filter(el => regex.test(el.title) || regex.test(el.ingredients) || regex.test(el.recipeDescription) || regex.test(el.category));

        this.searchstateService.changeSearch(this.itemsList);
        this.router.navigate([ROUTES.SEARCH]);
        this.searchForm.reset();
      }
    })
  }


  ngOnInit(): void {
  }

}
