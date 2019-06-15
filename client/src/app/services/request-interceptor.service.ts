import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';

import { environment } from '../../environments/environment';

const bypassURLs: Array<string> = [
  
];
@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.url);
    if (request.url.indexOf('accessToken') === -1) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userService.getAuthToken()}`
        }
      });
    }

    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpErrorResponse) {
        console.log('event--->>>', event);
      }
      return event;
    }));
  }
}