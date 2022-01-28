const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nickname: {
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

module.exports = mongoose.model("User", UserSchema);