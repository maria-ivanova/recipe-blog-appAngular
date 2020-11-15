import { Component, OnInit } from '@angular/core';

import ROUTES from '../../constants/routes';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  ROUTES = ROUTES;
  
  constructor() { }

  ngOnInit(): void {
  }

}
