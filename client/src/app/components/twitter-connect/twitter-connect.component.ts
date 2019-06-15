import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../services/connect.service';
@Component({
  selector: 'app-twitter-connect',
  templateUrl: './twitter-connect.component.html',
  styleUrls: ['./twitter-connect.component.scss']
})
export class TwitterConnectComponent implements OnInit {

  constructor(private connectService:ConnectService) { }

  ngOnInit() {
  }

  connectToTwitter() {
    this.connectService.getRequestToken().subscribe((resp)=>{
      let url = resp.data.url;
      location.href=url;
    });
  }

}
