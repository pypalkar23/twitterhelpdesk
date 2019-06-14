const Router = require('express').Router();
const Controller = appRequire('ctrl.user');

Router.post('/register',Controller.registerUser);
Router.post('/login',Controller.login);

module.exports = Router;