import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import  { environment } from "../environments/environment";
import { IRecipe } from '../interfaces/recipe.interface';

const httpOptions = {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
}

const httpOptionsPost = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
}

const { databaseURL, recipeDB, categoriesDB } = environment.db;

@Injectable()
export class FirebaseRequestsService {
    constructor(private httpClient: HttpClient){}

    postCreate(data: IRecipe) {
        return this.httpClient.post<IRecipe>(`${databaseURL}/${recipeDB}.json`, data, httpOptionsPost);
    };
    
    postEdit(itemId: string, data: IRecipe): Observable<IRecipe> {
        return this.httpClient.put<IRecipe>(`${databaseURL}/${recipeDB}/${itemId}.json`, data, httpOptions)
    }
    
    getItemInfo(id: string): Observable<IRecipe> {
        return this.httpClient.get<IRecipe>(`${databaseURL}/${recipeDB}/${id}.json`);
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