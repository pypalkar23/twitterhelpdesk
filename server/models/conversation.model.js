let mongoose = require('mongoose');

let Names = require('./collection.names');

let mongooseUtils = require('./mongoose.utils');

let Schema = mongoose.Schema;

let uuid = require('uuid');

let ConversationSchema = new Schema({
    _id: {
        type: String
    },

    conversation: [{
        id: String,
        text: String,
        in_reply_to_status: String,
        user_id: String,
        user_name: String,
        screen_name: String,
        timestamp: String
    }]
}, mongooseUtils.defaultSchemaOption);

module.exports = mongoose.model(Names.conversation, ConversationSchema);

