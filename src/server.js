const express = require('express');
const postRouter = require('./post/post.routes');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/",postRouter);
app.use(errorMiddleware);



app.get('*', function(req, res){
  res.status(404).sendFile('./pages/404.html', { root: __dirname });
});

module.exports = app;