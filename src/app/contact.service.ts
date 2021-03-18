import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {url} from './api';
 
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient:HttpClient) { }
  

  async addContact(newContact:any){                         //Function for calling register backend api
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    let i =await this.httpClient.post(url.db+'register', newContact, {headers:headers})
    .pipe(map((res:any)=>res));
    return i;
  }
  
  async login(newContact:any){                           //Function for calling login backend api
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
     let i= await this.httpClient.post(url.db+'login', newContact, {headers:headers})
    .pipe(map((res:any)=>res));
    return i;
 
    
  }

  loggedIn(){                                         //Returns true if token exists else false
    return !!localStorage.getItem('token');
  }

  getToken(){                                         //It returns the token value 
    localStorage.getItem('token');
  }
}
