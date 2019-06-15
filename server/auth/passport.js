const passport = require('passport');
const passportJWT = require("passport-jwt");
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { createHash } = require('crypto');

const Users = appRequire('model.user');
const sessionManager = appRequire('session.manager');
const config = appRequire('config');



errorCodes = {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD'
}


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, callback) => {
    Users
        .findOne({ email: email })
        .populate('accountId')
        .lean()
        .exec()
        .then((user) => {
            //console.log(user);
            if (!user) {
                return callback(null, false, errorCodes.USER_NOT_FOUND);
            }
            const salt = user.salt;
            const saltedPassword = salt + password + salt;
            const hashedPassword = createHash('md5').update(saltedPassword).digest("hex").toString();


            if (user.password != hashedPassword) {
                return callback(null, false, errorCodes.INCORRECT_PASSWORD);
            }

            return callback(null, user);

        })
        .catch((error) => {
            console.log(error);
            return callback(err);
        });
}));

passport.use('jwt-auth', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_encrypt_key
},
    (payload, callback) => {
        if (payload.scope !== 'user') {
            return callback(null, payload);
        }
        sessionManager
            .getUserSession(payload.sub)
            .then((res) => {
                console.log("res", res, payload);
                if (res && res instanceof Array && (res.indexOf(payload.session_id)) !== -1) {
                    return callback(null, payload);
                }
                return callback(null, false);
            })
            .catch(error => callback(error));
    }
));

