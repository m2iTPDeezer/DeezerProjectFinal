import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  mail : any;
  password : any;
  pseudo : any;
  role : any;
  id: any = undefined;
  isConnect = false;
  formData: FormData;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }
  
  
    ngOnInit() {
      if (this.route.snapshot.params.id != undefined) {
        this.api.getApi('utilisateur/' + this.route.snapshot.params.id).subscribe((res: any) => {
          this.id = res.id;
          this.mail = res.mail;
          this.password = res.password;
          this.pseudo = res.pseudo;
          this.role = res.role;
        })
      }
      this.formData = new FormData();
    }
  
    UploadFile = (files) => {
      if (files.length === 0)
        return
      this.formData.append('avatar', files[0]);
    }
  
    Inscription = () => {
      const user = { Pseudo: this.pseudo, Mail: this.mail, Password: this.password, Role: this.role };
      for (let k in user) {
        console.log(k + " "+ user[k]);
        this.formData.append(k, user[k]);
      }
      if (this.id == undefined) {
        this.api.upload('utilisateur/', this.formData).subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            // console.log(Math.round(100 * event.loaded / event.total))
          }
          else if (event.type == HttpEventType.Response) {
            const res = <any>event.body;
            if (!res.error) {
              alert(res.message + " " + res.userId);
              this.router.navigate(["/"]);
            }
            else {
              alert(res.message);
            }
          }
        })
  
      }
      else {
        this.api.put('utilisateur/' + this.id, user).subscribe((res: any) => {
          alert(res.message);
          if (!res.error)
            this.router.navigate(['/']);
        })
      }
      this.formData = new FormData();
      this.isConnect = true;
    }
}
