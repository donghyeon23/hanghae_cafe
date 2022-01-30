const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    postId: {
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
});

CommentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
});
CommentSchema.set("toJSON", {
    virtuals: true,
});


module.exports = mongoose.model("Comment", CommentSchema);