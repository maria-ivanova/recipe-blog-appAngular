import { Component, OnInit } from '@angular/core';

import { FirebaseRequestsService } from '../../../services/firebase.requests.service';
import ROUTES from '../../../constants/routes';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  allCategories: string[];
  ROUTES = ROUTES;

  constructor(public firebaseRequestsService: FirebaseRequestsService) {
  }

  getAllCategories() {
		this.firebaseRequestsService.getCategories().subscribe(data => {
      this.allCategories = Object.values(data)[0]
    });
	}

  ngOnInit(): void {
    this.getAllCategories()
  }

}
