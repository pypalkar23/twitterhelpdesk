const Twitter = require('node-twitter-api');
const { twitterAuth } = appRequire('config');
const twitter = new Twitter(twitterAuth);
const ResponseUtils = appRequire('utils.response');
const MapperUtils = appRequire('utils.mapper');
const Conversation = appRequire('model.conversation');

const errorCodes = {
    REQUEST_TOKEN_ERROR: 'REQUEST_TOKEN_ERROR',
    ACCESS_TOKEN_ERROR: 'ACCESS_TOKEN_ERROR',
    TWEET_LIST_ERROR: 'TWEET_LIST_ERROR',
    TWEET_RETRIEVAL_ERROR: 'TWEET_RETRIEVAL_ERROR',
    TWEET_REPLY_ERROR: 'TWEET_REPLY_ERROR'
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
    let params = {
        count
    }
    if (max_id) {
        params.max_id = max_id;
    }

    twitter.getTimeline('mentions_timeline', params, accessToken, accessTokenSecret, (err, data, result) => {
        if (err) {
            return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_LIST_ERROR, err));
        }
        //console.log(result);
        res.json(ResponseUtils.responseSuccess(MapperUtils.tweetsMapper(data)));
    })
}

const getTweet = (req, res) => {
    const accessToken = req.body.accessToken;
    const accessTokenSecret = req.body.accessTokenSecret;
    //const tweetId = req.body.id;
    //const replyToStatusId = req.body.replyToStatusId;
    const tweet = req.body.tweet;
    const reply_to_status_id = tweet.in_reply_to_status;
    //console.log(reply_to_status_id);
    if (reply_to_status_id)
        Conversation.find({ _id: reply_to_status_id }, (err, result) => {
            let conversation = []
            if (err) {
                return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_RETRIEVAL_ERROR, err));
            }

            if (!result || result.length == 0) {
                conversation = [];
            }
            else {
                doc = result[0];
                conversation = doc.conversation;
            }
            conversation.push(tweet);
            return res.json(ResponseUtils.responseSuccess({ conversation }));
        })
    else {
        let conversation = [tweet];
        return res.json(ResponseUtils.responseSuccess({ conversation }));
    }
    /*twitter.statuses('show', { id: tweetId }, accessToken, accessTokenSecret, (err, data, result) => {
        if (err) {
            return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_RETRIEVAL_ERROR, err));
        }
        res.json(ResponseUtils.responseSuccess({ data, err }));
    })*/

}


const sendTweet = (req, res) => {
    const accessToken = req.body.accessToken;
    const accessTokenSecret = req.body.accessTokenSecret;
    const tweetId = req.body.id;
    const status = req.body.status;
    let conversation = req.body.conversation;
    twitter.statuses('update', { status: status, in_reply_to_status_id: tweetId }, accessToken, accessTokenSecret, (err, data, result) => {
        if (err) {
            return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_REPLY_ERROR, err));
        }

        //console.log(JSON.stringify(result));
        let tweet = MapperUtils.tweetMapper(data);
        //console.log(data,tweet);
        conversation.push(tweet);
        Conversation.findOneAndUpdate({_id:tweetId},{$set:{conversation:conversation}},{upsert:true,new:true},(err,resp)=> {
            if(err){
                return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_REPLY_ERROR, err));
            }
            res.json(ResponseUtils.responseSuccess({resp}));
        })
    })
}

/*const getConversation = (req, res) => {
    const accessToken = req.body.accessToken;
    const accessTokenSecret = req.body.accessTokenSecret;
    const tweetId = req.body.id;
    const self = req.body.self;
    const other = req.body.other;
    twitter.search({
        q:"to:mandarpalkar4"
    }, accessToken, accessTokenSecret, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_REPLY_ERROR, err));
        }
        console.log(JSON.stringify(data));
        twitter.search({
            q: "to:"+ self+" "+"from:" + other,
        }, accessToken, accessTokenSecret, (err1, data1) => {
            if (err1) {
                console.log(err);
                return res.json(ResponseUtils.responseMessage(false, errorCodes.TWEET_REPLY_ERROR, err1));
            }
            
            res.json(ResponseUtils.responseSuccess({ data, data1 }));
        })
    })
}*/

/*const getConversation = (req, res) => {

}*/
module.exports = {
    getRequestToken: getRequestToken,
    getAccessToken: getAccessToken,
    getTweets: getTweets,
    getTweet: getTweet,
    sendTweet: sendTweet,
    //getConversation: getConversation
}
