const redis = require('redis');

const config = appRequire('config');

const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});

const dbIndex = config.redis.dbIndex;

const setToken = (user_id, session_id) => {
    return new Promise((resolve, reject) => {
        client.select(dbIndex, () => {
            client.sadd(user_id, session_id, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    });
};

const getUserSession = (user_id) => {
    return new Promise((resolve, reject) => {
        client.select(dbIndex, () => {
            client.smembers(user_id, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    });
};

const invalidateToken = (user_id, session_id) => {
    return new Promise((resolve, reject) => {
        client.select(dbIndex, () => {
            client.srem(user_id, [session_id], (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    });
};

const invalidateUserSessions = (user_id) => {
    return new Promise((resolve, reject) => {
        if (!user_id) {
            return reject(new Error('User ID cannot be empty.'));
        }
        client.select(dbIndex, () => {
            client.del(user_id, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    });
};

module.exports = {
    setToken,
    getUserSession,
    invalidateToken,
    invalidateUserSessions,
    client
}