const passport = require('passport');
const ResponseUtils = appRequire('utils.response')
module.exports = (app) => {
    app.use('/auth/user', appRequire('api.user'))

    app.use('/api/*', (req, res, next) => {
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
        
    })

    app.use('/api/sessions',appRequire('api.sessions'));
    
}