import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router"
import { ApiService } from './api.service';
import { Subject, Observable } from 'rxjs';
@Injectable()
export class GuardService implements CanActivate {

  isLogged = new Subject<any>();
  constructor(private api: ApiService) {

  }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return Observable.create((observe) => {
      this.api.postApi('auth/isLogged', { id: localStorage.getItem('id'), token: localStorage.getItem('token') }).subscribe((res: any) => {
            observe.next(!res.error);
          },(err) => {
            observe.next(false);
          })
      })
    }
}
