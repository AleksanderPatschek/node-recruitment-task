const database = require('../localDatabase');

const addPost = (post) => {
  database.posts.push(post);

  return Promise.resolve(post)
};

const getPostById = (postId) => {
  const post = database.posts.find(post => post.id === postId);

  if (!post) {
    return Promise.reject(`Could not find post with id: ${postId}`);
  }

  return Promise.resolve(post);
};

const removePost = (postId) => {
  const postIndex = database.posts.findIndex(post => post.id === postId);

  if (postIndex < 0) {
    return Promise.reject(`Could not delete post with id: ${postId}. It does not exist`);
  }

  database.posts = [...database.posts.slice(0, postIndex), ...database.posts.slice(postIndex+1)];

  return Promise.resolve();
};

const getPosts = () => Promise.resolve(database.posts);



module.exports = {
  addPost: addPost,
  getPostById: getPostById,
  removePost: removePost,
  getPosts: getPosts
}