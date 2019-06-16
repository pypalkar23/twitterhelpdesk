import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.scss']
})
export class HelpdeskComponent implements OnInit {

  constructor(private userService: UserService) { }
  username: string;
  ngOnInit() {
    this.username = this.userService.getUsername();
  }

  logout(){
    this.userService.logout();
  }


}
