module.exports = {
    port: 5000,
    host: '127.0.0.1',
    mongo: {
        uri: 'mongodb://localhost:27017/helpdesk'
    },
    redis: {
        host: 'localhost',
        port: 6379,
        dbIndex: 1
    },

    twitterAuth:{
        consumerKey:'bNML5gU932vicnxt54gtokzrF',
        consumerSecret:'GSjN09k3P1Q2wW8P5olaVR2cb7RnmwXMZUG6hTseUdyg031yOG',
        callback:'http://127.0.0.1:4200/callback'
    },
    jwt_encrypt_key: '0f225be8b644498c25dd421a12e7cbeb'
};