import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public apiBase = environment.apiBase;

  public LOGIN_API = `${this.apiBase}/auth/user/login`;
  public REGISTER_API = `${this.apiBase}/auth/user/register`;
  public LOGOUT_API = `${this.apiBase}/api/sessions/logout`;

  constructor(private http: HttpClient,private router:Router) {
    
   }

  
  public login(userCreds) {
    return this.http.post<any>(this.LOGIN_API, userCreds);
  }

  public register(userDetails){
    return this.http.post<any>(this.REGISTER_API,userDetails);
  }

  public setAuthToken(access_token, user) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getAuthToken() {
    return localStorage.getItem('access_token');
  }

  public logout(){
    this.http.get(this.LOGOUT_API).subscribe((resp)=>{
      this.clearUserData();
    })
  }

  public getUsername(){
    const user = JSON.parse(localStorage.getItem('user'));
    return user.username;
  }

  public getUserId() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user._id;
  }

  public setTwitterDetails(twitter_user, twitter_access_token, twitter_secret_token) {
    localStorage.setItem('twitter_user', JSON.stringify(twitter_user));
    localStorage.setItem('twitter_access_token', twitter_access_token);
    localStorage.setItem('twitter_secret_token', twitter_secret_token);
  }

  public getTwitterUser() {
    const user = JSON.parse(localStorage.getItem('twitter_user'));
    return user;
  }

  public getTwitterTokens() {
    const twitter_access_token = localStorage.getItem('twitter_access_token');
    const twitter_secret_token = localStorage.getItem('twitter_secret_token');
    return { accessToken:twitter_access_token, accessTokenSecret:twitter_secret_token };
  }

  public clearUserData(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('twitter_access_token');
    localStorage.removeItem('twitter_secret_token');
    this.router.navigate(["/login"]);
  }
  
}
