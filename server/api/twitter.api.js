const Router= require('express').Router();
const Controller = appRequire('ctrl.twitter');

Router.get('/requestToken',Controller.getRequestToken);
Router.get('/accessToken',Controller.getAccessToken);

module.exports = Router;