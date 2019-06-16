const Router= require('express').Router();
const Controller = appRequire('ctrl.twitter');

Router.get('/requestToken',Controller.getRequestToken);
Router.get('/accessToken',Controller.getAccessToken);
Router.post('/tweets',Controller.getTweets);
Router.get('/tweet',Controller.getTweet);
Router.post('/tweet',Controller.sendTweet);
//Router.post('/conversation',Controller.getConversation);
module.exports = Router;