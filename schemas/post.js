const mongoose = require("mongoose");
const Comment = require('./comment')

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

PostSchema.pre("deleteOne",
    { document: false, query: true },
    async function (next) {
        // post id 
        const { _id } = this.getFilter();
        // 관련 댓글 삭제
        await Comment.deleteMany({ postId: _id });
        next();
    });


module.exports = mongoose.model("Post", PostSchema);