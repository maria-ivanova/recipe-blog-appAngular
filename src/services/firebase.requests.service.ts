import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { databaseURL, recipeDB, categoriesDB } from "../constants/db.js";
import { IRecipe } from '../interfaces/recipe.interface';

@Injectable()
export class FirebaseRequestsService {
    constructor(private httpClient: HttpClient){}

    postCreate(data) {
        return fetch(`${databaseURL}/${recipeDB}.json`, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
    };
    
    postEdit(id, data)  {
        return fetch(`${databaseURL}/${recipeDB}/${id}.json`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
    }
    
    getItemInfo(id) {
        return fetch(`${databaseURL}/${recipeDB}/${id}.json`);
    }
    
    getData(): Observable<IRecipe[]> {
        return this.httpClient.get<IRecipe[]>(`${databaseURL}/${recipeDB}.json`);
    }
    
    getCategories() {
        return this.httpClient.get(`${databaseURL}/${categoriesDB}.json`)
    }
    
    deleteItem(id) {
        return fetch(`${databaseURL}/${recipeDB}/${id}.json`, {
            method: 'DELETE'
        })
    }
}