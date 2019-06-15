import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = "mandar.palkar@gmail.com";
  password = "Mandar*123";
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {

  }


  loginUser() {
    this.userService.login({email:this.email,password:this.password}).subscribe((resp)=>{
      this.userService.setAuthToken(resp.data.token,resp.data.detail);
      this.router.navigate(["/connect"]);
    })
  }

  
}
