import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/firebase.auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(public userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

}
