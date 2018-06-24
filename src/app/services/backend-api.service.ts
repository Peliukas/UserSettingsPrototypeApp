import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class BackendApiService {

  baseUrl: string = 'http://localhost:8000';
  apiSegment: string = '/api';
  headers = new Headers();

  options: RequestOptions;

  constructor(private http: Http) {
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.options = new RequestOptions({headers: this.headers});
  }

  public checkUserStatus(){
    return this.http.get(this.baseUrl + this.apiSegment + '/users', this.options);
  }

  public getUserAvatar(userID: number){
    return this.http.get(this.baseUrl + '/storage/avatars/' + userID + '.png', this.options);
  }

  public submitChanges(userData: any){
    if(userData.id){
      return this.http.patch(this.baseUrl + this.apiSegment + '/users', userData,this.options);
    }else{
      return this.http.post(this.baseUrl + this.apiSegment + '/users', userData,this.options);
    }
  }

  public uploadImage(image: any, userID: number){
    let formData: FormData = new FormData();
    formData.append('user_avatar', image, 'avatar');
    this.http.post(this.baseUrl + this.apiSegment + '/users/'+ userID +'/avatar', formData, this.options)
      .map(res => res.json)
      .subscribe( response => {
        console.log("response: ", response);
      })
  }


}
