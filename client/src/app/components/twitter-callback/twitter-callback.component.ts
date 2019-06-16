import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ConnectService } from './../../services/connect.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-twitter-callback',
  templateUrl: './twitter-callback.component.html',
  styleUrls: ['./twitter-callback.component.scss']
})
export class TwitterCallbackComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private connectService:ConnectService,
    private userService:UserService,
    private router:Router) {
        this.connectService.getAccessToken(location.search).subscribe((resp)=>{
          this.userService.setTwitterDetails(resp.data.twitter_user,resp.data.accessToken,resp.data.accessSecret);
          //console.log("details set");
          this.router.navigate(['/helpdesk']);
        })
     }

  ngOnInit() {
    
  }


}
