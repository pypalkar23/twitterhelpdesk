let tweetsMapper = (tweets) => {
    let result = tweets.map((tweet) => {
        return {
            id: tweet.id_str,
            text: tweet.text,
            in_reply_to_status: tweet.in_reply_to_status_id_str,
            user_id: tweet.user.id_str,
            user_name: tweet.user.name,
            screen_name: tweet.user.screen_name,
            timestamp: tweet.created_at
        }
    })

    result.sort((a,b)=>{
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    })
    return result;
}

let tweetMapper = (tweet) => {
    return {
        id: tweet.id_str,
        text: tweet.text,
        in_reply_to_status: tweet.in_reply_to_status_id_str,
        user_id: tweet.user.id_str,
        user_name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        timestamp: tweet.created_at
    }
}

module.exports = {
    tweetsMapper: tweetsMapper,
    tweetMapper:tweetMapper
}