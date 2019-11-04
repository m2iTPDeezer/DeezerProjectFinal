import { GuardService } from './../guard.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  islogged = false;
  constructor(private api: ApiService, private guard: GuardService) { }

  ngOnInit() {
    this.guard.isLogged.subscribe((res) => {
      if (res) {
        this.api.postApi('auth/isLogged', { id: localStorage.getItem('id'), token: localStorage.getItem('token') }).subscribe((res: any) => {
          this.islogged = !res.error
        }, (err) => {
          this.islogged = false;
        })
      }
      else {
        this.islogged = false;
      }
    })

  }

}
