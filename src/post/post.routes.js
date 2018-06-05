const express = require('express');
const router = express.Router();
const Post = require('./post.model');
const PostRepository = require('./post.repository');

router
  .post('/posts', (req, res) => {
    PostRepository.addPost(Post.fromRequestBody(req.body))
                  .then(post => {
                    res
                      .status(201)
                      .json({
                        message: 'Post created',
                        payload: post.toJSON()
                      })
                  })
                  .catch(error => {
                    res
                      .status(500)
                      .json({ error });
                  })
  })

  .get('/posts', (req, res) => {
    PostRepository.getPosts()
                  .then((posts) => {
                    res
                      .status(200)
                      .json({
                        payload: posts
                      })
                  })
                  .catch(error => {
                    res
                      .status(500)
                      .json({ error });
                  })
  })

  .get('/posts/:postId', (req, res) => {
    PostRepository.getPostById(req.params.postId)
                  .then((post) => {
                    res
                      .status(200)
                      .json({
                        payload: post.toJSON()
                      })
                  })
                  .catch(error => {
                    res
                      .status(500)
                      .json({ error });
                  })
  })

  .delete('/posts/:postId', (req, res) => {
    PostRepository.removePost(req.params.postId)
                  .then(() => {
                    res
                      .status(204)
                      .send();
                  })
                  .catch(error => {
                    res
                      .status(500)
                      .json({ error });
                  })
  });

module.exports = router;