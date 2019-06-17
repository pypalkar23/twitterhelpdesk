import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller', { static: true }) private myScrollContainer: ElementRef;
  userId: string;
  private _unsubscriber: Subject<void> = new Subject<void>();
  conversation: any = [];
  constructor(private conversationService: ConversationService, private userService: UserService) { }
  tweet_id: string;
  replyMessage: String;

  ngOnInit() {
    this.userId = this.userService.getTwitterUser().id_str;
    this.conversationService.tweet.subscribe((tweet) => {
      if (tweet)
        this.conversationService.getTweet(tweet).subscribe((resp) => {
          if (resp.status) {
            this.conversation = resp.data.conversation;
            //console.log(this.conversation);
            if (this.conversation && this.conversation.length != 0) {
              this.tweet_id = this.conversation[0].id
            }
            this.scrollToBottom();
          }
        })
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendReply() {
    if (this.replyMessage.length != 0) {
      this.conversationService.postTweet({ id: this.tweet_id, status: this.replyMessage, conversation: this.conversation }).subscribe((resp) => {
        let temp = resp.data.resp.conversation[resp.data.resp.conversation.length - 1];
        console.log(temp);
        this.conversation.push(temp);
      });
    }
  }

  isUsersMessage(msg) {
    return this.userId === msg.user_id;
  }

  ngOnDestroy() {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
