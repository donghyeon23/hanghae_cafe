const express = require('express');
const Post = require('../schemas/post')
const router = express.Router();


router.get('/', (req, res) => {
    res.send('this is home page');
});

router.put('/post', async (req, res) => {
    const { title, writer, content, password, date } = req.body;
    const { id } = req.query;

    if (id === undefined) {
        console.log(req.body);
        const createPosts = await Post.create({ title, writer, content, password, date });
    } else {
        console.log(id, req.body)
        await Post.findOneAndUpdate({ _id: id }, { title, writer, content });
    }

    res.json({ success: true });
});

router.delete('/post', async (req, res) => {
    const { id } = req.query;

    await Post.findOneAndDelete({ _id: id });

    res.json({ success: true });
})

router.get('/post/password', async (req, res) => {
    const { id, password } = req.query;

    const post = await Post.findOne({ _id: id });
    if (post.password === password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});




module.exports = router;