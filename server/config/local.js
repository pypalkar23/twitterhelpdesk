module.exports = {
    port: 5000,
    host: '0.0.0.0',
    mongo: {
        uri: 'mongodb://0.0.0.0:27017/helpdesk'
    },
    redis: {
        host: 'localhost',
        port: 6379,
        dbIndex: 1
    },

    twitterAuth:{
        consumerKey:'#######',
        consumerSecret:'#######',
        callback:'http://0.0.0.0:5000/callback'
    },
    jwt_encrypt_key: '0f225be8b644498c25dd421a12e7cbeb'
};
