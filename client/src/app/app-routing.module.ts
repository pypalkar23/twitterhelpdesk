import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { TwitterConnectComponent } from './components/twitter-connect/twitter-connect.component'
import { HelpdeskComponent } from './components/helpdesk/helpdesk.component';
import { TwitterCallbackComponent } from './components/twitter-callback/twitter-callback.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  }, {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'connect',
    component: TwitterConnectComponent
  },
  {
    path: 'helpdesk',
    component: HelpdeskComponent
  }, {
    path: 'callback',
    component: TwitterCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
