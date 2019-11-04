import { GuardService } from './../guard.service';
import { LoginComponent } from './../login/login.component';
import { AppComponent } from './../app.component';
import { AlertComponent } from './../alert/alert.component';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-menu-user',
  templateUrl: './item-menu-user.component.html',
  styleUrls: ['./item-menu-user.component.css']
})
export class ItemMenuUserComponent implements OnInit {
  user:any = undefined;
  
  constructor(private api:ApiService, private resolver : ComponentFactoryResolver, private guard:GuardService, private app:AppComponent) { }

  ngOnInit() {
    this.getUser();
    this.guard.isLogged.subscribe((res)=> {
      if(res) {
        this.getUser();
      }
      else {
        this.user = undefined;
      }
    })
  }

  getUser = () => {
    this.api.postApi('auth/getUser', {id : localStorage.getItem('id'), token : localStorage.getItem('token')}).subscribe((res:any)=> {
      if(res.error) {
        this.user = undefined;
      }
      else {
        this.user = res.user
      }
    })
  }

  logOut = () => {
    this.api.postApi('auth/logout', {id : localStorage.getItem('id'), token : localStorage.getItem('token')}).subscribe((res:any)=> {
      if(!res.error){
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        this.guard.isLogged.next(false);
      }
    })
  }
  popup = (type, event) => {
    console.dir(event);
    this.app.getPopUpContainer().clear();
    const factory = this.resolver.resolveComponentFactory(AlertComponent);
    const component = this.app.getPopUpContainer().createComponent(factory);
    component.instance.top = event.clientY + 'px';
    component.instance.left = (event.clientX + 25) + 'px';
    component.instance.parent = this.app.getPopUpContainer()
    switch(type) {
      case 'login':
          component.instance.type = LoginComponent;
        break;
    }
    
  }

}
