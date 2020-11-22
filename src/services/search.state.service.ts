import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchstateService {
    private searchSource = new BehaviorSubject('');
    searchResult = this.searchSource.asObservable();

    constructor() { }

    changeSearch(searchResult) {
        this.searchSource.next(searchResult);
    }
}