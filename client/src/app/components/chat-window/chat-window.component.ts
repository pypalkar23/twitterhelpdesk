import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  private _unsubscriber: Subject<void> = new Subject<void>();
  conversation:any=[];
  constructor(private conversationService:ConversationService) { }
  tweet_id:string;
  replyMessage:String;
  ngOnInit() {
    this.conversationService.tweet.subscribe((tweet)=>{
      if(tweet)
      this.conversationService.getTweet(tweet).subscribe((resp)=>{
        this.conversation=resp.data.conversation;
        //console.log(this.conversation);
        if(this.conversation && this.conversation.length!=0){
          this.tweet_id = this.conversation[0].id
        }
      })
    })
  }

  sendReply(){
    if(this.replyMessage.length!=0){
      this.conversationService.postTweet({id:this.tweet_id,status:this.replyMessage,conversation:this.conversation}).subscribe((resp)=>{
         let temp= resp.data.resp.conversation[resp.data.resp.conversation.length-1];
         console.log(temp);
         this.conversation.push(temp);
      });
    }
  }

  ngOnDestroy() {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

}
