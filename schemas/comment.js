const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: {
        type: Array,
    },
});

module.exports = mongoose.model("Comment", CommentSchema);