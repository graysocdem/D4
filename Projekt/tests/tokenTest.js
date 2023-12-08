const assert = require('assert');
const request = require('supertest');
const { httpApp, httpsApp} = require('../server/server.js');
require("./userTest.js")

describe('Authentication attempts with invalid tokens', () => {
  it('Should not be authenticated with expired token', (done) => {
    request(httpApp)
      .get('/user/ElonTest')
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpYXQiOjE2OTc3MTA5NzIsImV4cCI6MTY5NzcxNDU3Mn0.qeXlU_s06KwnY1NHRUu_G_VZwR4LP-TV6MTeLgykGBw")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      })});

  it('Should not be authenticated without token', (done) => {
    request(httpApp)
      .get('/user/ElonTest')
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

});
