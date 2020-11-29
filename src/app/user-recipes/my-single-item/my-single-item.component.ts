import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FirebaseRequestsService } from '../../../services/firebase.requests.service';
import { IRecipe } from '../../../interfaces/recipe.interface';
import ROUTES from '../../../constants/routes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-single-item',
  templateUrl: './my-single-item.component.html',
  styleUrls: ['./my-single-item.component.css']
})
export class MySingleItemComponent implements OnInit {
  @Input() item: IRecipe;
  @Output() public handleDelete: EventEmitter<any> = new EventEmitter<any>();
  ROUTES = ROUTES;

  constructor( 
    public firebaseRequestsService: FirebaseRequestsService,
    private toastr: ToastrService ) { }

  deleteItem(itemId) {
    this.firebaseRequestsService.deleteItem(itemId).subscribe(data => {
      this.toastr.success('Рецептата беше успeшно изтрита!');
      this.handleDelete.emit(itemId);
      
    }, error => {
      this.toastr.error('Неуспешно изтриване на рецепта!');
    })
  }

  ngOnInit(): void {
  }

}
