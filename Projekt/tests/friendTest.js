const request = require('supertest');
const { httpApp, httpsApp} = require('../server/server.js');
require("./userTest.js")

describe('Friendship and Request', () => {
  it('should send a friend request', (done) => {
    request(httpApp)

      .post('/MarkTest/request')
      .set('x-access-token', token)
      .send({ owner: 'ElonTest', suitor: 'MarkTest' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should accept a friend request', (done) => {
    request(httpApp)
      .patch('/accept')
      .set('x-access-token', token)
      .send({ owner: 'MarkTest', suitor: 'ElonTest' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should fail to create a new post on a user\'s page', (done) => {

    request(httpApp)
      .post('/post')
      .set('x-access-token', token)
      .send({ owner: 'ElonTest', user: 'BillGates', message: 'We will change x back to twitter boys' })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
    });

    it('should create a new post on a friend\'s page', (done) => {

      request(httpApp)
        .post('/post')
        .set('x-access-token', token)
        .send({ owner: 'ElonTest', user: 'MarkTest', message: 'Tjena grabben, läget?!' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
      });

});
