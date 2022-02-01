const mongoose = require("mongoose");

const connect = () => {
    mongoose
        .connect("mongodb://test1:test1234@54.180.137.157:27017/hanghae_cafe?authSource=admin")
        .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect;