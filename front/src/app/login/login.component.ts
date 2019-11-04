import { GuardService } from './../guard.service';
import { ApiService } from './../api.service';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  end = new EventEmitter<any>();
  constructor(private api:ApiService, private guard : GuardService) { }

  ngOnInit() {
  }

  login = () => {
    this.api.postApi('auth/login', {email : this.email, password : this.password}).subscribe((res:any)=> {
      if(res.error){
        alert("Erreur de connexion")
      }
      else {
        localStorage.setItem('id',res.id);
        localStorage.setItem('token',res.token);
        this.end.emit(true);
        this.guard.isLogged.next(true);
      }
    })
  }

}
