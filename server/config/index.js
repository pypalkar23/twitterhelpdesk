let path = require('path');
let environment = process.env.NODE_ENV || 'local';

let config = {
    
    root : path.normalize(__dirname + './../../'),
    
    mongo : {
        uri : 'mongodb://localhost:27017/helpdesk'
    }
};

function merge(config, env){
    for(let key in env){
        config[key] = env[key];
    }
    return config;
}

module.exports = merge(config, require('./' + environment));