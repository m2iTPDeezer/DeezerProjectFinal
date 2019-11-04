import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
@Injectable()
export class ApiService {

  urlBase = "http://localhost:59713";
  constructor(private http : HttpClient) { 

  }

  getApi = (url) => {
    return this.http.get(this.urlBase + url);
  }

  postApi = (url, data) => {
    return this.http.post(this.urlBase + url,data);
  }

  upload = (url, formdata)=> {
    //pour envoyer une requete vers une api protegée par un jwt, il faut ajouter dans l'entete de la requete l'authorization avec le token
    const headers = new HttpHeaders({
      /******pas mettre car affiche erreur */
      //"Content-type": "multipart/form-data",
      // "Authorization": "Bearer "+localStorage.getItem("token")
    });
    //reportProgress => pour ecouter la progression de l'upload; observe => pour ecouter la totalité de l'event et non uniquement la réponse du serveur
    return this.http.post(this.urlBase+'/'+url, formdata,{headers : headers,reportProgress: true, observe:'events'});
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

  }
