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
  nom : any;
  prenom : any;
  email : any;
  password : any;
  id: any = undefined;
  isConnect = false;
  formData: FormData;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }
  
  
    ngOnInit() {
      if (this.route.snapshot.params.id != undefined) {
        this.api.get('client/' + this.route.snapshot.params.id).subscribe((res: any) => {
          this.id = res.id;
          this.nom = res.nom;
          this.prenom = res.prenom;
          this.email = res.email;
          this.password = res.password;
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
      const client = { Nom: this.nom, Prenom: this.prenom, Email: this.email, Password: this.password };
      for (let k in client) {
        console.log(k + " "+ client[k]);
        this.formData.append(k, client[k]);
      }
      if (this.id == undefined) {
        this.api.upload('client', this.formData).subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            // console.log(Math.round(100 * event.loaded / event.total))
          }
          else if (event.type == HttpEventType.Response) {
            const res = <any>event.body;
            if (!res.error) {
              alert(res.message + " " + res.clientId);
              this.router.navigate(["/listeClient"]);
            }
            else {
              alert(res.message);
            }
          }
        })
  
      }
      else {
        this.api.put('client/' + this.id, client).subscribe((res: any) => {
          alert(res.message);
          if (!res.error)
            this.router.navigate(['/listeClient']);
        })
      }
      this.formData = new FormData();
      this.isConnect = true;
    }
      // if (this.id == undefined) {
      //   this.api.upload('client', this.formData).subscribe(event => {
      //     if (event.type == HttpEventType.UploadProgress) {
      //       console.log(Math.round(100 * event.loaded / event.total))
      //     }
      //     else if (event.type == HttpEventType.Response) {
      //       const res = <any>event.body;
      //       if (!res.error) {
      //         alert(res.message + " " + res.clientId);
      //         this.router.navigate(["/"]);
      //       }
      //       else {
      //         alert(res.message);
      //       }
      //     }
      //   })
  
      // }
     

}
