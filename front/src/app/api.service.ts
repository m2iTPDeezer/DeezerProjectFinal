import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
@Injectable()
export class ApiService {

  urlBase = "http://localhost:8084/";
  constructor(private http : HttpClient) { 

  }

  getApi = (link) => {
    return this.http.get(this.urlBase + link);
  }

  postApi = (link, data) => {
    return this.http.post(this.urlBase + link,data);
  }

  put = (url, data) => {
    //pour envoyer le token, on spécifie que c'est en json avec content-type 
    const headers = new HttpHeaders({
    //   "Content-type": "application/json",
    //   "Authorization": "Bearer " + localStorage.getItem("token")
    });
    return this.http.put(this.urlBase + '/' + url, data, {headers : headers});
    // return this.http.put(this.baseUrl + '/' + url, data);

  }

  delete = (url) => {
    this.http.delete(this.urlBase + '/' + url)
  }


  //connection
  login = (url, email, password) => {
    // const headers = new HttpHeaders({
    //   "Content-type": "application/json",
    //   "Authorization": "Bearer " + localStorage.getItem("token")
    // });

    // return this.http.post(this.baseUrl + '/' + url, {Email : email, Password: password}, {headers : headers});
    return this.http.post(this.urlBase + '/' + url, {Email : email, Password: password});

  }

  upload = (url, formdata)=> {
    //pour envoyer une requete vers une api protegée par un jwt, il faut ajouter dans l'entete de la requete l'authorization avec le token
    const headers = new HttpHeaders({
      //"Content-type": "multipart/form-data",
      // "Authorization": "Bearer "+localStorage.getItem("token")
    });
    //reportProgress => pour ecouter la progression de l'upload; observe => pour ecouter la totalité de l'event et non uniquement la réponse du serveur
    return this.http.post(this.urlBase+'/'+url, formdata,{headers : headers,reportProgress: true, observe:'events'});
    //return this.http.post(this.baseUrl+'/'+url, formdata);
  }

  list25 = (url)=>{
    return this.http.get(this.urlBase + '/'+url);
  }
  }
