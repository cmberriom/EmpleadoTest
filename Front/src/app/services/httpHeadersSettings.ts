import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class httpHeadersSettings {

  constructor(){}    
  
  getHttpOptionsNoAuth() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      })
    };
    return httpOptions;
  }
  
}
