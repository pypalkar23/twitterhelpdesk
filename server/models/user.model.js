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

    username : {
        type : String
    },

    email : {
        type : String,
        lowercase : true,
        unique:true
    },

    salt:{
        type:String
    },

    password : {
        type : String,
    },
}, mongooseUtils.defaultSchemaOption);

module.exports = mongoose.model(Names.user, UserSchema);

