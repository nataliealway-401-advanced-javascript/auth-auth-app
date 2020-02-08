'use strict';

const {server} = require('../../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');
const User = require('../../src/model/userModel.js')


const user = new User();

const users = {
  a: { username: 'david', password: 'gumball' },
  b: { username: 'miso', password: 'soup' },
  c: { username: 'cheesesteak', password: 'sandwich' },
  baduser: {username: 'badatsigningup'},
};


describe('Auth server routes testing', ()=>{
  it('should post a new user', (done)=> {
    mockRequest.post('/signup')
      .send(users.a)
      .then(res => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should fail to post a new user', done => {
    mockRequest
      .post('/signup')
      .send(users.baduser)
      .then(res => {
        expect(res.status).toBe(500);
        done();
      });
  });

  

  it('should return a list of users', (done)=>{
    mockRequest.get('/users')
      .then(res => {
        
        expect(res.body.results[0].username)
          .toBe('david');
        done();
      });
  });

  it('should successfully sign in', done => {
    
    mockRequest.post('/signin')
      .auth(users.a.username, users.a.password)
      .then(res => {
        expect(res)
          .not.toBe('Invalid User');
        done();
      });
  });

  it('should unsuccessfully sign in with an incorrect password', done => {
    mockRequest
      .post('/signin')
      .auth(users.a.username, 'not the password')
      .then(res => {
        expect(res).not.toBe('Invalid User');
        done();
      });
  });

  it('should return 404 when a non-existent route is hit',(done)=>{
    mockRequest
      .get('/bad')
      .then(res => expect(res.status).toBe(404));
    done();
  });
});