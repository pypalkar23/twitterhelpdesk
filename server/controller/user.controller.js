
const { createHash } = require('crypto');

const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const sessionManager = appRequire('session.manager');
const User = appRequire('model.user');
const config = appRequire('config');
const ResponseUtils = appRequire('utils.response');

const errorcodes = {
    INCOMPLETE_DETAILS: 'INCOMPLETE_DETAILS',
    IMPROPER_PASSWORD: 'IMPROPER_PASSWORD',
    IMPROPER_USER: 'IMPROPER_USERNAME',
    IMPROPER_EMAIL_ID: 'IMPROPER_EMAIL_ID',
    DUPLICATE_USER: 'DUPLICATE_USER',
    GENERIC: 'GENRIC',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    INCORRECT_PASSWORD: 'INCORRECT_PASSWORD'
}

const validPasswordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
const validUsernameRegex = /^[A-Za-z]{1,}[A-Za-z0-9]{4,}/;
const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const registerUser = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;

    if (!username || !email || !password)
        return res.json(ResponseUtils.responseMessage(false, errorcodes.INCOMPLETE_DETAILS, { desc: "Please Input All The Details" }));

    if (!validUsernameRegex.test(username))
        return res.json(ResponseUtils.responseMessage(false, errorcodes.IMPROPER_USER, { desc: "Enter valid username" }));

    if (!validEmailRegex.test(email))
        return res.json(ResponseUtils.responseMessage(false, errorcodes.IMPROPER_EMAIL_ID, { desc: "Enter valid Email Id" }));

    if (!validPasswordRegex.test(password))
        return res.json(ResponseUtils.responseMessage(false, errorcodes.IMPROPER_PASSWORD, { desc: "Enter valid Password" }));

    const salt = makeSalt();
    const saltedPassword = salt + password + salt;
    const hashedPassword = createHash('md5').update(saltedPassword).digest("hex").toString();

    let newUser = new User({
        username,
        password: hashedPassword,
        email,
        salt
    })

    newUser.save((err, resp) => {
        if (err) {
            if (err.code && err.code == 11000)
                return res.json(ResponseUtils.responseMessage(false, errorcodes.DUPLICATE_USER, { desc: "User already exists" }));
            return res.json(ResponseUtils.responseMessage(false, errorcodes.GENRIC, { desc: "Something Went Wrong" }));
        }
        const { email } = resp
        return res.json(ResponseUtils.responseSuccess("user saved for email id " + email));
    })
}

const login = (req, res) => {
    console.log("In Login");
    passport.authenticate('local', { session: false }, (err, user, info) => {
        //console.log("login",user);
        if (info) {
            return res.status(200).json(ResponseUtils.responseMessage(false, errorcodes[info] || errorcodes.GENERIC));
        }
        if (err) {
            return res.status(500).json(ResponseUtils.responseMessage(false, errorcodes[info] || errorcodes.GENERIC));
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(200).json({ success: false, message: 'Incorrect Email ID or password.' });
            }
            const { password, salt, ...rest } = user;
            const session_id = uuid();
            const token = jwt.sign({ sub: user._id, session_id, email: user.email, scope: 'user' }, config.jwt_encrypt_key, { expiresIn: '1d' });
            sessionManager
                .setToken(user._id, session_id)
                .then(() => {
                    const token = jwt.sign({ sub: user._id, session_id, email: user.email, scope: 'user' }, config.jwt_encrypt_key, { expiresIn: '1d' });
                    return res.status(200).json({ success: true, message: 'Login successful', data:{detail: rest, token} });
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, message: 'Something went wrong!' });
                });
        });
    })(req, res);

}

const logout = (req,res)=>{
    
}

const makeSalt = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = {
    registerUser: registerUser,
    login: login
}