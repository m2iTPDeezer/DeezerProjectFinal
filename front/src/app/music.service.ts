import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  trackSubject = new Subject<any>();
  constructor() { 

  }
}
