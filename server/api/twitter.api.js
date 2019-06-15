const Router= require('express').Router();
const Controller = appRequire('ctrl.twitter');

Router.get('/requestToken',Controller.getRequestToken);
Router.get('/accessToken',Controller.getAccessToken);
Router.get('/tweets',Controller.getTweets);
Router.get('/tweet',Controller.getTweet);

module.exports = Router;