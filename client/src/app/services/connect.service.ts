import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':  'text-plain',
    })
  }
  
  public apiBase = environment.apiBase;

  public REQUEST_TOKEN_API= `${this.apiBase}/api/twitter/requestToken`;
  public ACCESS_TOKEN_API= `${this.apiBase}/api/twitter/accessToken`;

  constructor(private http: HttpClient) { }

  public getRequestToken() {
    console.log("in connect service")
    return this.http.get<any>(this.REQUEST_TOKEN_API);
  }

  public getAccessToken(data){
    return this.http.get<any>(this.ACCESS_TOKEN_API+data);
  }
}
