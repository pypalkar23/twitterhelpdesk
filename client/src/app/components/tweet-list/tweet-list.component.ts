import { Component, OnInit, HostListener } from '@angular/core';
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
  max_id: string;
  callingApi: boolean = false;
  ngOnInit() {
    this.callingApi = true;
    this.conversationService.getTweets().subscribe((resp) => {
      if (resp.status) {
        let tempTweets = resp.data;
        tempTweets.forEach(tweet => {
          this.tweets.push(tweet);
          this.max_id = tweet.id;
        });
        //console.log(this.tweets);
      }
      this.callingApi = false;
    })
  }

  getTweets() {
    this.callingApi = true;
    this.conversationService.getTweets(this.max_id).subscribe((resp) => {
      if (resp.status) {
        let tempTweets = resp.data;
        tempTweets.forEach(tweet => {
          this.tweets.push(tweet);
          this.max_id = tweet.id;
        });
        //console.log(this.tweets);
      }
      this.callingApi = false;
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


  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let element = document.getElementById('tweet_list');
    let pos = (element.scrollTop || element.scrollTop) + element.offsetHeight;
    let max = element.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      if (!this.callingApi) {
        this.getTweets();
      }
    }
  }


}
