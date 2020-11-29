import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
title: string = 'Страницата не е намерена';
innerText: string = 'Съжаляваме, но страницата, която търсите не съществува.';

  constructor() { }

  ngOnInit(): void {
  }

}
