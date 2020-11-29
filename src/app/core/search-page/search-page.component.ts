import { Component, OnInit } from '@angular/core';

import { SearchstateService } from '../../../services/search.state.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  title: string = 'Резултат от търсенето';
  itemsList: any;

  constructor(
    private searchstateService: SearchstateService,
    ) { }

  searchHandler() {
    this.searchstateService.searchResult.subscribe(data => {
      this.itemsList = data;
    })
  }

  ngOnInit(): void {
    this.searchHandler()
  }

}
