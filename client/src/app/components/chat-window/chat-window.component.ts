import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  private _unsubscriber: Subject<void> = new Subject<void>();

  constructor(private conversationService:ConversationService) { }

  ngOnInit() {
    this.conversationService.tweet.subscribe((tweet)=>{
      console.log(tweet);
    })
  }

  ngOnDestroy() {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

}
