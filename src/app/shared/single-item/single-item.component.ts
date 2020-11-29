import { Component, OnInit, Input } from '@angular/core';

import { IRecipe } from '../../../interfaces/recipe.interface';
import ROUTES from '../../../constants/routes';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {
  @Input() item: IRecipe;
  ROUTES = ROUTES;

  constructor() { }

  ngOnInit(): void {
  }

}
