import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TwitterConnectComponent } from './components/twitter-connect/twitter-connect.component';
import { ConnectService } from './services/connect.service';
import { ConversationService } from './services/conversation.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { UserService } from './services/user.service';
import { HelpdeskComponent } from './components/helpdesk/helpdesk.component';
import { TwitterCallbackComponent } from './components/twitter-callback/twitter-callback.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { LoginGuard } from './guards/login.guard';
import { DateFormatPipe } from './pipes/date-format.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TwitterConnectComponent,
    HelpdeskComponent,
    TwitterCallbackComponent,
    TweetListComponent,
    ChatWindowComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    ConnectService, 
    ConversationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
