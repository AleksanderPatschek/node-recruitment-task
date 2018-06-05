jest.mock('uuid');

const database = require('../localDatabase');
const Post = require('./post.model');
const app = require('../server');
const request = require('supertest');

const insertDataToArray = () => {
  database.posts.push(new Post('81d18e4a-45dd-4bcf-b79b-2abd8b932663', 'some title', 'some content'))
}

describe('App', () => {
  afterEach(() => {
    database.posts = [];
  });

  it('creates post', (done) => {
    request(app)
      .post('/posts')
      .send({
        title: 'some title',
        content: 'some content'
      })
      .end((err, res) => {
        expect(res.body).toEqual({
          message: 'Post created',
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            title: 'some title',
            content: 'some content'
          }
        });
        done();
      })
  });

  it('return 404 if post dont contain title', (done) => {
    request(app)
      .post('/posts')
      .send({
        content: 'some content'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      })
  });

  it('return 404 if post dont contain content', (done) => {
    request(app)
      .post('/posts')
      .send({
        title: 'some title'
      })
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      })
  });

  it('gets post if exist', (done) => {
    insertDataToArray();
    request(app)
      .get('/posts/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .end((err, res) => {
        expect(res.body).toEqual({
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            title: 'some title',
            content: 'some content'
          }
        });
        done();
      })
  });

  it('return error if post do not exist', (done) => {
    request(app)
      .get('/posts/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .end((err, res) => {
        expect(res.body).toEqual({
          error: "Could not find post with id: 81d18e4a-45dd-4bcf-b79b-2abd8b932663"
        });
        expect(res.status).toEqual(500);
        done();
      })
  });

  it('gets posts', (done) => {
    insertDataToArray();
    request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res.body).toEqual({
          payload: [{
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            title: 'some title',
            content: 'some content'
          }]
        });
        done();
      })
  });

  it('return empty array if there are no posts', (done) => {
    request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res.body).toEqual({
          payload: []
        });
        done();
      })
  });

  it('remove post', (done) => {
    insertDataToArray();
    const server = request(app);
    server
      .delete('/posts/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .expect(204)
      .end(() => {
        server
          .get('/posts')
          .end((err, res) => {
            expect(res.body.payload.length).toBe(0);
            done();
          });
      })
  })

  it('return error if remove post cannot be performed', (done) => {
    request(app)
      .delete('/posts/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .end((err, res) => {
        expect(res.body).toEqual({
          error: "Could not delete post with id: 81d18e4a-45dd-4bcf-b79b-2abd8b932663. It does not exist"
        });
        expect(res.status).toEqual(500);
        done();
      })
  });
});