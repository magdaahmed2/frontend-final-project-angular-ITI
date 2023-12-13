import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  private searchResultsSource = new BehaviorSubject<any[]>([]);
  currentSearchResults = this.searchResultsSource.asObservable();

  updateSearchResults(results: any[]) {
    this.searchResultsSource.next(results);
  }
}
