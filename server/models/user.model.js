let mongoose = require('mongoose');

let Names = require('./collection.names');

let mongooseUtils = require('./mongoose.utils');

let Schema = mongoose.Schema;

let uuid = require('uuid');

let UserSchema = new Schema({

    _id : {
        type : String,
        default : uuid.v4
    },

    name : {
        type : String
    },

    email : {
        type : String,
        lowercase : true
    },

    password : {
        type : String,
    },
}, mongooseUtils.defaultSchemaOption);

module.exports = mongoose.model(Names.user, UserSchema);

