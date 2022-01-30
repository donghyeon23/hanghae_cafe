const express = require('express');
const Post = require('../schemas/post');
const User = require('../schemas/user');
const authMiddleware = require('./auth-middleware');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('this is home page');
});

router.put('/post', authMiddleware, async (req, res) => {
    const { title, content, date } = req.body;
    const { id } = req.query;
    const { user } = res.locals;

    if (id === undefined) {
        console.log(req.body);
        const createPosts = await Post.create({ title, nickname: user.nickname, content, date });
    } else {
        console.log(id, req.body)
        await Post.findOneAndUpdate({ postId: id }, { title, content });
    }

    res.json({ success: true });
});

router.delete('/post', async (req, res) => {
    const { id } = req.query;

    await Post.findOneAndDelete({ _id: id });

    res.json({ success: true });
})

router.get('/comments', async (req, res) => {
    const { id } = req.query;

    await Post.findOneAndDelete({ _id: id });

    res.json({ success: true });
})

// 글 비밀번호 삭제
// router.get('/post/password', async (req, res) => {
//     const { id, password } = req.query;

//     const post = await Post.findOne({ _id: id });
//     if (post.password === password) {
//         res.json({ success: true });
//     } else {
//         res.json({ success: false });
//     }
// });




module.exports = router;