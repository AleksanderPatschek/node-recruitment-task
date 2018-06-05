const express = require('express');
const router = express.Router();
const Post = require('./post.model');
const PostRepository = require('./post.repository');
const validationMiddleware = require("../middlewares/validation");
const PostValidators = require("./post.validators");

router
  .post('/posts', validationMiddleware(PostValidators.postValidator), (req, res, next) => {
    PostRepository.addPost(Post.fromRequestBody(req.body))
                  .then(post => {
                    res
                      .status(201)
                      .json({
                        message: 'Post created',
                        payload: post.toJSON()
                      })
                  })
                  .catch(error => next(error))
  })

  .get('/posts', (req, res, next) => {
    PostRepository.getPosts()
                  .then((posts) => {
                    res
                      .status(200)
                      .json({
                        payload: posts
                      })
                  })
                  .catch(error => next(error))
  })

  .get('/posts/:postId', (req, res, next) => {
    PostRepository.getPostById(req.params.postId)
                  .then((post) => {
                    res
                      .status(200)
                      .json({
                        payload: post.toJSON()
                      })
                  })
                  .catch(error => next(error))
  })

  .delete('/posts/:postId', (req, res, next) => {
    PostRepository.removePost(req.params.postId)
                  .then(() => {
                    res
                      .status(204)
                      .send();
                  })
                  .catch(error => next(error))
  });

module.exports = router;