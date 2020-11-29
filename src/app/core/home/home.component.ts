import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
titleNewRecipes: string = 'Нови рецепти';
titleMostLiked: string = 'Най-харесвани рецепти';

  constructor() { }

  ngOnInit(): void {
  }

}
