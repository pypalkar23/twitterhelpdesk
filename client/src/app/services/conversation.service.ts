import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  public apiBase = environment.apiBase;

  public GET_TWEETS_API = `${this.apiBase}/api/twitter/tweets`;
  public GET_TWEET = `${this.apiBase}/api/twitter/conversation`;
  public SEND_TWEET = `${this.apiBase}/api/twitter/tweet`;


  constructor(private http: HttpClient) {
    
  }

  public tweet = new BehaviorSubject<any>(null);

  setTweet(value:any){
    this.tweet.next(value);
  }

  getTweets(max_id=null) {
    let data={};
    if(max_id)
      data['max_id']=max_id;
    return this.http.post<any>(this.GET_TWEETS_API,data);
  }

  getTweet(data) {
    return this.http.post<any>(this.GET_TWEET, {tweet:data});
  }

  postTweet(data) {
    return this.http.post<any>(this.SEND_TWEET, data);
  }

}
