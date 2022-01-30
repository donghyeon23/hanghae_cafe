const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
});

PostSchema.virtual("postId").get(function () {
    return this._id.toHexString();
});
PostSchema.set("toJSON", {
    virtuals: true,
});


module.exports = mongoose.model("Post", PostSchema);