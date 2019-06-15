let requireConfig = require('./require.config');
global.appRequire = function (alias) {
    return require(__dirname + '/' + requireConfig[alias.toLowerCase()]);
};

Object.keys(requireConfig).forEach(function (alias) {
    if (alias.indexOf('model.') > -1) {
        appRequire(alias);
    }
});

let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let compression = require('compression');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();
let config = appRequire('config');
let redisClient = appRequire('session.manager').client;
let session = require('express-session');
let redisStore = require('connect-redis')(session);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(compression());

appRequire('passport');

app.use(cors());

app.use(session({
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: '_redisPractice',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
    store: new redisStore({ client: redisClient, ttl: 86400 })
}))

require('./routes')(app);

redisClient.on('connect', () => {
    console.log(`Connected to redis - HOST: ${config.redis.host}, PORT: ${config.redis.port}`);
    mongoose.connect(config.mongo.uri, {
        socketOptions: {
            socketTimeoutMS: 100000,
            connectionTimeout: 90000
        },
        reconnectTries: 400, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        mongos: true
    }, function (err) {
        if (err) {
            console.error(err);
            redisClient.quit();
            return;
        }
        var server = http.createServer(app);

        server.listen(config.port, config.host, function () {
            console.log('Helpdesk server started on port: ' + config.port + ' HOST : ' + config.host);
        });
    });

});

let onServerEnd = () => {
    mongoose.connection.close(() => {
        console.log("Mongoose Connection Disconnecting On App Restart");
        redisClient.quit();
        process.exit(0);
    });
}

process.on('SIGTERM', onServerEnd);
process.on('SIGUSR2', onServerEnd);
process.on('SIGINT', onServerEnd);

mongoose.connection.on('disconnected', () => { console.log(`Mongoose Default Connection Disconnected - ${new Date()}`) });
mongoose.connection.on('error', (err) => { console.log(`Mongoose Default Connection errored - ${new Date()} \n\n`, err) });
mongoose.connection.on('connected', () => { console.log(`Mongoose Connected To URI - ${new Date()}`) });

redisClient.on('end', () => {
    console.log(`Connection to redis ended - HOST: ${config.redis.host}, PORT: ${config.redis.port}`);
});

redisClient.on('error', (error) => {
    console.log(error);
    console.log(`Redis connection error - HOST: ${config.redis.host}, PORT: ${config.redis.port}`);
    // onServerEnd();
});

redisClient.on('reconnecting', () => {
    console.log(`Reconnecting to redis - HOST: ${config.redis.host}, PORT: ${config.redis.port}`);
});

