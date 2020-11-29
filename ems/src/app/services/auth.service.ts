import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

    invokeAppComponent=new EventEmitter();
    subsVar:Subscription;

    registerUser(user) {
      return this.http.post<any>(`/user/register`, user)
    }
  
    loginUser(user) {
      return this.http.post<any>(`/user/login`, user)
    }
  
    logoutUser() {
      localStorage.removeItem('token')
    }
  
    onLogin(){
      this.invokeAppComponent.emit();
    }

    getToken() {
      return localStorage.getItem('token')
    }
  
    loggedIn() {
      return !!localStorage.getItem('token')    
    }

    getUserId(){
      return this.http.get(`/user/userid`,{
        params:new HttpParams().append('token',localStorage.getItem('token'))
      })
    }

    getUserName(id){
      return this.http.get(`/user/username/${id}`)
    }
}