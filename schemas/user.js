const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    article: {
        type: Array,
    },
    comment: {
        type: Array,
    },
});

module.exports = mongoose.model("User", UserSchema);