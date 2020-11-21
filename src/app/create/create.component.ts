import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FirebaseRequestsService } from '../../services/firebase.requests.service';
import { UserAuthService } from '../../services/firebase.auth.service';
import { firebaseErrors, customErrors } from '../../constants/errors';
import { IRecipe } from '../../interfaces/recipe.interface';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  allCategories: string[];
  newItem: IRecipe;
  imageUrl: string;
  imageFile: File;
  errorMsg: string = '';
  customErrors = customErrors;

  createForm = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'category': new FormControl('', [Validators.required]),
    'totalTime': new FormControl('', [Validators.required, Validators.maxLength(10)]),
    'yields': new FormControl('', [Validators.required, Validators.min(1)]),
    'ingredients': new FormControl('', [Validators.required]),
    'recipeDescription': new FormControl('', [Validators.required]),
  })

  constructor(
    public firebaseRequestsService: FirebaseRequestsService,
    public userAuthService: UserAuthService,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private router: Router,
  ) { }

  get getFormControls() {
    return this.createForm.controls;
  }

  get loggedUser() {
    return this.userAuthService.user;
  }

  getAllCategories() {
    this.firebaseRequestsService.getCategories().subscribe(data => {
      this.allCategories = Object.values(data)[0];

      this.createForm.controls.category.setValue(this.allCategories[0])
    });
  }

  imageHandler(event) {
    if (event.target.files[0]) {
        this.imageFile = event.target.files[0]; 
    }
  }

  createRecipe() {
    this.newItem = {...this.createForm.value};
    this.newItem.creatorId = this.loggedUser.uid;
    this.newItem.creatorName = this.loggedUser.displayName;
    this.newItem.imageUrl = this.imageUrl;

    this.firebaseRequestsService.postCreate(this.newItem).subscribe(data => {
      this.toastr.success('Успешно създадена рецепта!');
      this.createForm.reset();
      this.imageFile = null;
      this.imageUrl = '';
      this.errorMsg = '';
    }, error => {
      this.errorMsg = customErrors['failedCreate'];
    })
  }

  submitHandler() {
    if(this.createForm.value.title.trim() === '' || this.createForm.value.category.trim() === '' || 
        this.createForm.value.totalTime.trim() === '' || this.createForm.value.ingredients.trim() === '' || 
        this.createForm.value.recipeDescription.trim() === '') {
        
      this.errorMsg = customErrors['requiredFields'];
      return;
    }

    if (this.getFormControls.yields.errors?.required || this.getFormControls.yields.errors?.min) {
      this.errorMsg = customErrors['mustBeInteger'];
      return;
    }

    if (this.getFormControls.totalTime.errors?.maxlength) {
      this.errorMsg = customErrors['maxLengthTotalTime'];
      return;
    }

    if (!this.imageFile) {
      this.errorMsg = customErrors['missingImage'];
      return;
    }

    const filePath = `images/${this.imageFile.name}`;
    const fileRef = this.storage.ref(filePath);

    this.storage.upload(filePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.imageUrl = url;
          this.createRecipe();
        })
      })
    ).subscribe(); 
  }

  ngOnInit(): void {
    this.getAllCategories()
  }

}
