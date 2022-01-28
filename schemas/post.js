const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
});

module.exports = mongoose.model("Post", PostSchema);