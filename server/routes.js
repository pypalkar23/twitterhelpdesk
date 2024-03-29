const passport = require('passport');
const express = require('express');
const path = require('path');
const ResponseUtils = appRequire('utils.response')
const config = appRequire('config');
console.log(config.root);
module.exports = (app) => {
    app.use('/auth/user', appRequire('api.user'));

    app.use('/api/*', (req, res, next) => {
        if (req.originalUrl.indexOf("accessToken") > -1) {
            return next();
        }
        else {
            passport.authenticate('jwt-auth', { session: false }, (err, payload, info) => {
                if (err) {
                    return res.status(401).json(ResponseUtils.responseMessage(false, 'Unauthenticated'));
                }
                if (!payload) {
                    return res.status(401).json(ResponseUtils.responseMessage(false, 'Unauthenticated'));
                }
                req.user = payload;
                return next();
            })(req, res)
        }
    });

    app.use('/api/sessions', appRequire('api.sessions'));
    app.use('/api/twitter', appRequire('api.twitter'));
    app.use('/', express.static(path.join(config.root, 'client', 'dist','client')));
    app.use('/*', (req, res) => res.sendFile(path.join(config.root, 'client', 'dist','client','index.html')));

}