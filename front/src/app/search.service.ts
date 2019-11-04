import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SearchService {
  searchSubject = new Subject<any>();
  constructor() { 

  }
}
