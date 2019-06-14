const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const Users = appRequire('model.user');

const sessionManager = appRequire('session.manager');

const config = appRequire('config'); 

passport.use(new LocalStrategy({
	usernameField: 'emailid',
	passwordField: 'password'
}, (emailid, password, callback) => {
	Users
		.findOne({ email: emailid })
		.populate('accountId')
		.lean()
		.exec()
		.then((user) => {
			//console.log(user);
			if (!user) {
				return callback(null, false);
			}

			//if access not granted yet to the user or user hasn't verified himself yet
			if (!user.accountId || !user.password) {
				return callback(null, false, 'Access Requested');
			}

			//if the password doesnt match with records
			if (user.password != password) {
				return callback(null, false);
			}

			//if the account is not active
			if (!user.accountId || !user.is_active) {
				return callback(null, false);
			}

			Users.findOneAndUpdate({ _id: user._id }, { $set: { lastLoggedIn: new Date() } }, function (err, data) {
				callback(null, user);
			});
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
				if (res && res instanceof Array && (res.indexOf(payload.session_id)) !== -1) {
					return callback(null, payload);
				}
				return callback(null, false);
			})
			.catch(error => callback(error));
	}
));
