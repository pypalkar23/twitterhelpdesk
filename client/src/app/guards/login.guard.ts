import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  public helper = new JwtHelperService();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate() {
    console.log("guard");
    if (this.helper.isTokenExpired(this.userService.getAuthToken())) {
      this.router.navigate(['/login']);
    } else {
      return true;
    }
  };
}
