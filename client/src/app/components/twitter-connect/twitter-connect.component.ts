import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
import { UserService} from '../../services/user.service';
@Component({
  selector: 'app-twitter-connect',
  templateUrl: './twitter-connect.component.html',
  styleUrls: ['./twitter-connect.component.scss']
})
export class TwitterConnectComponent implements OnInit {

  constructor(private connectService:ConnectService,private userService:UserService) { }
  username:string
  ngOnInit() {
    this.username= this.userService.getUsername();
  }

  connectToTwitter() {
    this.connectService.getRequestToken().subscribe((resp)=>{
      let url = resp.data.url;
      location.href=url;
    });
  }

  logout(){
    this.userService.logout();
  }
}
