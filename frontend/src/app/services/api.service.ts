import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url:string = "http://localhost:3000/api_v1"  //development
  url:string = 'https://gmi-video-player.herokuapp.com/api_v1'; //production 

  constructor(private http: HttpClient) { }

  add(title:string, url:string, description:string){
    const body = {
      title : title,
      url : url,
      description : description
    }

   return  this.http.post(this.url+'/add',body)
  }

  get(){
   return this.http.get(this.url+'/get');
  }
}



