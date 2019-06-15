const Twitter = require('node-twitter-api');
const { twitterAuth } = appRequire('config');
const twitter = new Twitter(twitterAuth);
const ResponseUtils = appRequire('utils.response');
const errorCodes = {
    REQUEST_TOKEN_ERROR: 'REQUEST_TOKEN_ERROR',
    ACCESS_TOKEN_ERROR: 'ACCESS_TOKEN_ERROR',
    TWEET_LIST_ERROR: 'TWEET_LIST_ERROR',
    TWEET_RETRIEVAL_ERROR: 'TWEET_RETRIEVAL_ERROR'
}

let _requestSecret;
const getRequestToken = (req, res) => {
    twitter.getRequestToken((err, requestToken, requestSecret) => {
        if (err) {
            return res.json(ResponseUtils.responseMessage(false, errorCodes.REQUEST_TOKEN_ERROR, err));
        }
        _requestSecret = requestSecret
        return res.json(ResponseUtils.responseSuccess({ "url": "https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken, requestSecret }));
    })
}

const getAccessToken = (req, res) => {
    const requestToken = req.query.oauth_token;
    const verifier = req.query.oauth_verifier;
    const requestSecret = _requestSecret;
    twitter.getAccessToken(requestToken, requestSecret, verifier, function (err, accessToken, accessSecret) {
        if (err) { console.log(err), res.status(500).send(err); }
        else {
            twitter.verifyCredentials(accessToken, accessSecret, function (err, user) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(ResponseUtils.responseSuccess({ twitter_user: user, accessToken: accessToken, accessSecret: accessSecret }));
            });
        }
    });
}

const getTweets = (req, res) => {
    const accessToken = req.body.accessToken;
    const accessTokenSecret = req.body.accessTokenSecret;
    let max_id = req.body.max_id;
    const count = 50;
    let params={
        count
    }
    if (max_id) {
        max_id = max_id - 1;
        params.max_id = max_id;
    }

    console.log(max_id);
    twitter.getTimeline('mentions_timeline', params , accessToken, accessTokenSecret, (err,data,result) => {
        if (err) {
            return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_LIST_ERROR, err));
        }
        //console.log(result);
        res.json(ResponseUtils.responseSuccess({data}));
    })
}

const getTweet = (req, res) => {
    const accessToken = req.body.accessToken;
    const accessTokenSecret = req.body.accessTokenSecret;
    const tweetId = req.body.id;
    
    twitter.statuses('show', { id: tweetId, include_my_retweet: true }, accessToken, accessTokenSecret, (err, data, result) => {
        if (err) {
            return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_RETRIEVAL_ERROR, err));
        }
        res.json(ResponseUtils.responseSuccess({ data,err }));
    })
}

module.exports = {
    getRequestToken: getRequestToken,
    getAccessToken: getAccessToken,
    getTweets: getTweets,
    getTweet: getTweet
}
