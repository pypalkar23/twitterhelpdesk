module.exports = {
    port: 5000,
    host: '0.0.0.0',
    mongo: {
        uri: 'mongodb://0.0.0.0:27017/helpdesk'
    },
    redis: {
        host: '0.0.0.0',
        port: 6379,
        dbIndex: 2
    },
    twitterAuth:{
        consumerKey:'#########',
        consumerSecret:'###########',
        callback:'http://159.65.156.153:5000/callback'
    },
    jwt_encrypt_key: 'dd29b8cb089a56606fca480e137c27c4'
};
