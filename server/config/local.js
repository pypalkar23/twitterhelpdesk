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
    jwt_encrypt_key: '0f225be8b644498c25dd421a12e7cbeb'
};