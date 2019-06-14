const Users = appRequire('model.user');
const sessionManager = appRequire('session.manager');
const ResponseUtils = appRequire('utils.response');

const logout = (req, res) => {
    sessionManager
        .invalidateToken(req.user.sub, req.user.session_id)
        .then(() => {
            res.status(200).json(ResponseUtils.responseMessage(true));
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json(ResponseUtils.responseMessage(false, 'Something went wrong!'));
        });
}

const currentUser = (req, res) => {
    const userID = req.user.sub;
    Users
        .findOne({ _id: userID })
        .lean()
        .exec()
        .then((user) => {
            const { password, salt, ...rest } = user;
            return res.status(200).json(ResponseUtils.responseSuccess(rest));
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json(ResponseUtils.responseMessage(false, 'Something went wrong!'));
        });
}

module.exports = {
    logout: logout,
    currentUser: currentUser
}