import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {

  constructor(private conversationService: ConversationService) { }
  tweets = [];
  currentTweet: any;
  ngOnInit() {
    this.conversationService.getTweets().subscribe((resp) => {
      if (resp.status) {
        let tempTweets = resp.data;
        tempTweets.forEach(tweet => {
          this.tweets.push(tweet);
        });
        console.log(this.tweets);
      }
    })
  }

  getConversation(tweet) {
    this.currentTweet = tweet;
    this.conversationService.setTweet(tweet);
  }

  isSelected(tweet) {
    if (this.currentTweet)
      return tweet.id == this.currentTweet.id;
  }

}
