import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  username: string;
  registerEmail: string;
  registerPassword: string;
  emailError: string;
  passwordError: string;
  registerEmailError: string;
  registerPasswordError: string;
  usernameError: string;
  disableRegister:boolean;
  disableLogin:boolean;

  validPasswordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  validUsernameRegex = /^[A-Za-z]{1,}[A-Za-z0-9]{4,}/;
  validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  errorcodes = {
    INCOMPLETE_DETAILS: 'Incomplete details provided',
    IMPROPER_PASSWORD: 'Improper password provided',
    IMPROPER_USER: 'Improper Username provided',
    IMPROPER_EMAIL_ID: 'Improper Username provided',
    DUPLICATE_USER: 'User already exists by given email id',
    GENERIC: 'Something Went Wrong',
    USER_NOT_FOUND: 'User does not exist for email id',
    INCORRECT_PASSWORD: 'Password is incorrect'
}
  commonError = {
    'login': {
      ERROR_EMAIL: 'Please check your Email',
      ERROR_PASSWORD: 'Password should contain atleast 6 letters,one special character, one uppercase letter,and one lowercase letter',
    },
    'register': {
      ERROR_EMAIL: 'Please check your Email',
      ERROR_PASSWORD: 'Password should contain atleast 6 letters,one special character, one uppercase letter,and one lowercase letter',
      ERROR_USERNAME: 'Username should be atleast 4 letters,should start with a letter,and should not contain any whitespace'
    }
  }

  constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { }


  ngOnInit() {
    this.userService.clearUserData();
    this.disableRegister=false;
    this.disableLogin=false;
  }

  registerUser() {
    if(this.validateRegister()){
      this.disableRegister = true;
      this.userService.register({username:this.username,password:this.registerPassword,email:this.registerEmail}).subscribe((resp)=>{
        if(resp.status){
          this.toastrService.success('You have registered successfully!','Registered');
          this.resetRegister();
        }
        else{
          this.toastrService.error(this.errorcodes['GENERIC'],"Error");
          this.disableRegister =false;
        }
      })
    }
  }


  loginUser() {
    if (this.validateLogin()) {
      this.disableLogin = true;
      this.userService.login({ email: this.email, password: this.password }).subscribe((resp) => {
        if (resp.status){
          this.userService.setAuthToken(resp.data.token, resp.data.detail);
          this.disableLogin = false;
          this.router.navigate(["/connect"]);
        }
        else{
          if(this.errorcodes[resp.message])
          this.toastrService.error(this.errorcodes[resp.message],"Error");
          else
          this.toastrService.error(this.errorcodes[resp.message],"Error");
          this.disableLogin=false;
        }
      })
    }
  }

  validateUser() {
    console.log(this.username);
    if (!this.username || this.username.length == 0 || !this.validUsernameRegex.test(this.username)) {
      this.usernameError = this.commonError.register.ERROR_USERNAME;
      return false;
    }
    else {
      this.usernameError = '';
      return true;
    }
  }


  validateEmail(email, type) {
    if (!this.validEmailRegex.test(email)) {
      if (type == 'login') {
        this.emailError = this.commonError[type].ERROR_EMAIL;
      }
      else {
        this.registerEmailError = this.commonError[type].ERROR_EMAIL;
      }
      return false;
    }
    else {
      if (type == 'login') {
        this.emailError = '';
      }
      else {
        this.registerEmailError = '';
      }
      return true;
    }

  }


  resetRegister(){
    this.username='';
    this.registerEmail='';
    this.registerPassword='';
    this.disableRegister = false;
  }

  validatePassword(password, type) {
    if (!this.validPasswordRegex.test(password)) {
      if (type == 'login') {
        this.passwordError = this.commonError[type].ERROR_PASSWORD;
      }
      else {
        this.registerPasswordError = this.commonError[type].ERROR_PASSWORD;
      }
      return false;
    }
    else {
      if (type == 'login') {
        this.passwordError = '';
      }
      else {
        this.registerPasswordError = '';
      }
      return true;
    }

  }

  validateLogin() {
    return this.validateEmail(this.email, 'login') && this.validatePassword(this.password, 'login');
  }

  validateRegister() {
    return this.validateUser() && this.validateEmail(this.registerEmail, 'register') && this.validatePassword(this.registerPassword, 'register');
  }

}
