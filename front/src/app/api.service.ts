import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
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
  }
