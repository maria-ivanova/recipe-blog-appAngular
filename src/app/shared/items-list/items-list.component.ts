import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { FirebaseRequestsService } from '../../../services/firebase.requests.service';
import { IRecipe } from '../../../interfaces/recipe.interface';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnChanges {
  @Input() sortCriterion: string;
  @Input() filerCriterion: string;
  @Input() secondFilterCriterion: string;
  @Input() maxElements: number;
  itemsList: IRecipe[];

  constructor(public firebaseRequestsService: FirebaseRequestsService) { }

  getAllItems() {
    this.firebaseRequestsService.getData().subscribe(data => {
      this.itemsList = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key]
        }
      })

      if (this.filerCriterion && this.secondFilterCriterion !== 'Всички рецепти') {
        this.itemsList = this.itemsList.filter(el => el[this.filerCriterion] === this.secondFilterCriterion);
      }

      if (this.sortCriterion) {
        this.itemsList = this.itemsList.sort((a, b) => b[this.sortCriterion] - a[this.sortCriterion]);
      }

      if (this.maxElements) {
        this.itemsList = this.itemsList.slice(0, this.maxElements)
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.getAllItems();
  }

}
