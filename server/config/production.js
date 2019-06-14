module.exports = {
    port: 5000,
    host: '127.0.0.1',
    mongo: {
        uri: 'mongodb://localhost:27017/helpdesk'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        dbIndex: 2
    },
    jwt_encrypt_key: 'dd29b8cb089a56606fca480e137c27c4'
};