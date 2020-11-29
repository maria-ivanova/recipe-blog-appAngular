import { Component, OnInit } from '@angular/core';

import ROUTES from '../../../constants/routes';

@Component({
  selector: 'app-index-banner',
  templateUrl: './index-banner.component.html',
  styleUrls: ['./index-banner.component.css']
})
export class IndexBannerComponent implements OnInit {
  ROUTES = ROUTES

  constructor() { }

  ngOnInit(): void {
  }

}
