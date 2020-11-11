import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { databaseURL, recipeDB, categoriesDB } from "../constants/db.js";

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
    
    getData() {
        return fetch(`${databaseURL}/${recipeDB}.json`).then(response => response.json())
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