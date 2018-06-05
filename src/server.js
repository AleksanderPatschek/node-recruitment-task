const express = require('express');
const postRouter = require('./post/post.routes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",postRouter);


module.exports = app;