const express = require('express');
const connect = require('./schemas');
const Post = require('./schemas/post');
const app = express();
const port = 3000;

const postRouter = require('./routes/posts')

connect();

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});

// view 템플릿으로 .ejs 파일 사용
app.set('view engine', 'ejs');
// ejs 파일 경로
app.set('views', './views');
app.use(express.static('static'));
app.use(express.urlencoded());
app.use(express.json());

app.use("/api", [postRouter]);

app.get('/', async (req, res) => {
    const posts = await Post.find().sort('-date');
    res.render('index', { posts: posts });
});

app.get('/post', async (req, res) => {
    const { id } = req.query;
    console.log(id)
    if (id === undefined) {
        res.render('post', { post: [], status: 'new', postNoId: [] });
    } else {
        const post = await Post.findOne({ _id: id });
        const postNoId = await Post.findOne({ _id: id }, { '_id': false });
        res.render('post', { post: post, status: 'old', postNoId: postNoId });
    }

});

app.get('/detail', async (req, res) => {
    const { id } = req.query;
    const post = await Post.findOne({ _id: id });
    res.render('detail', { post: post });
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸습니다!');
});

