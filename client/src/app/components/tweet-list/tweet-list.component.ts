import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import { runInThisContext } from 'vm';
@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {

  constructor(private conversationService:ConversationService) { }
  tweets=[];
  ngOnInit() {
    this.conversationService.getTweets().subscribe((resp)=>{
      if(resp.status){
         let tempTweets= resp.data;
         tempTweets.forEach(tweet => {
          this.tweets.push(tweet);
         });
         console.log(this.tweets);
      }
    })
  }

  getConversation(tweet){
    this.conversationService.setTweet(tweet);
  }

  

}
