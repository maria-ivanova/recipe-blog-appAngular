import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FirebaseRequestsService } from '../../../services/firebase.requests.service';
import { firebaseErrors, customErrors } from '../../../constants/errors';
import { IRecipe } from '../../../interfaces/recipe.interface';
import { imageRegex, imageValidator } from 'src/app/shared/validators';
import ROUTES from '../../../constants/routes';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title: string = 'Редактиране на рецепта';
  itemId: string;
  currentItem: IRecipe;
  allCategories: string[];
  ROUTES = ROUTES;
  customErrors = customErrors;
  imageFile: File;
  errorMsg: string = '';

  editForm = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'category': new FormControl('', [Validators.required]),
    'totalTime': new FormControl('', [Validators.required, Validators.maxLength(10)]),
    'yields': new FormControl('', [Validators.required, Validators.min(1)]),
    'ingredients': new FormControl('', [Validators.required]),
    'recipeDescription': new FormControl('', [Validators.required]),
    'uploadedImage': new FormControl('', [imageValidator]),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public firebaseRequestsService: FirebaseRequestsService,
    private toastr: ToastrService,
    private storage: AngularFireStorage
  ) { }

  get getFormControls() {
    return this.editForm.controls;
  }

  getAllCategories() {
    this.firebaseRequestsService.getCategories().subscribe(data => {
      this.allCategories = Object.values(data)[0]
    });
  }
  
  getInfo() {
    this.firebaseRequestsService.getItemInfo(this.itemId).subscribe(data => {

      if (!data) {
        this.router.navigate([ROUTES.NOT_FOUND]);
        return;
      }

      this.currentItem = data;

      this.editForm.setValue({
        title: this.currentItem.title,
        category: this.currentItem.category,
        totalTime: this.currentItem.totalTime,
        yields: this.currentItem.yields,
        ingredients: this.currentItem.ingredients,
        recipeDescription: this.currentItem.recipeDescription,
        uploadedImage: ''
      })
    })
  }

  deleteImage() {
    this.currentItem.imageUrl = '';
    this.imageFile = null;
}

imageHandler(event) {
  if (event.target.files[0]) {
      this.imageFile = event.target.files[0]; 
  }
}

  editRecipe() {
    this.currentItem = {...this.currentItem, ...this.editForm.value};

    this.firebaseRequestsService.postEdit(this.itemId, this.currentItem).subscribe(data => {

      this.toastr.success('Успешно редактиране на рецепта!');
      this.errorMsg = '';
    }, error => {
      this.errorMsg = customErrors['failedEdit'];
    })
  }

  submitHandler() {
    if(this.editForm.value.title.trim() === '' || this.editForm.value.category.trim() === '' || 
        this.editForm.value.totalTime.trim() === '' || this.editForm.value.ingredients.trim() === '' || 
        this.editForm.value.recipeDescription.trim() === '') {
        return;
    }

    if (this.getFormControls.yields.errors?.required || this.getFormControls.yields.errors?.min) {
      return;
    }

    if (this.getFormControls.totalTime.errors?.maxlength) {
      return;
    }

    if (!this.imageFile && !this.currentItem.imageUrl) {
      this.errorMsg = customErrors['missingImage'];
      return;
    }

    if (!imageRegex.test(this.imageFile.name.toLowerCase())) {
      this.errorMsg = customErrors['notSupportedFileType'];
      return;
    }

    if (this.currentItem.imageUrl) {
      this.editRecipe();
      return;
    }

    const filePath = `images/${this.imageFile.name}`;
    const fileRef = this.storage.ref(filePath);

    this.storage.upload(filePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.currentItem.imageUrl = url;
          this.editRecipe();
        })
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params.id;
    })

    this.getAllCategories();
    this.getInfo();
  }
}
