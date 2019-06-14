const Router = require('express').Router();
const Controller = appRequire('ctrl.sessions');

Router.get('/current',Controller.currentUser);
Router.get('/logout',Controller.logout);

module.exports= Router;