const express = require('express');
const jwt = require("jsonwebtoken");
const User = require('../schemas/user')
const authMiddleware = require("./auth-middleware");
const router = express.Router();

router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
        });
        return;
    }

    // nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
    const existsUsers = await User.findOne({ nickname });
    if (existsUsers) {
        // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
        res.status(400).send({
            errorMessage: "닉네임이 이미 사용중입니다.",
        });
        return;
    }

    const user = new User({ nickname, password });
    await user.save();

    res.status(201).send({});
});


router.post("/auth", async (req, res) => {
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname });

    // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
    if (!user || password !== user.password) {
        res.status(400).send({
            errorMessage: "닉네임 또는 패스워드가 틀렸습니다.",
        });
        return;
    }

    res.send({
        token: jwt.sign({ userId: user.userId }, "my-cafe-secret-key"),
    });
});

router.get("/users/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user,
    });
});

module.exports = router;