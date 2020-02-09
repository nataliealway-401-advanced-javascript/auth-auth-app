'use strict';

const {server} = require('../../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const User = require('../../src/model/userModel.js');

process.env.SECRET='secretSecretsAreNoFun';

const users = {
  a: { username: 'Natalie', password: 'Alway' },
  b: { username: 'John', password: 'Doe' },
  baduser: {username: 'badatsigningup'},
};


describe('Auth server routes testing', ()=>{
  it('should signup a new user', (done) => {
    mockRequest.post('/signup')
      .send(users.a)
      .then(res => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should fail at signing up a new user', (done) => {
    mockRequest
      .post('/signup')
      .send(users.baduser)
      .then(res => {
        expect(res.status).toBe(500);
        done();
      });
  });

  
  it('should get all users', (done) => {
    mockRequest.get('/users')
      .then(res => {
        expect(res.body.results[0].username).toBe('Natalie');
        done();
      });
  });

  it('should sign in a user', (done) => {
    mockRequest.post('/signin')
      .auth(users.a.username, users.a.password)
      .then(res => {
        expect(res).not.toBe('Invalid User');
        done();
      });
  });

  it('should not allow you to sign in with an incorrect password', (done) => {
    mockRequest
      .post('/signin')
      .auth(users.a.username, 'Incorrect login information')
      .then(res => {
        expect(res).not.toBe('Invalid User');
        done();
      });
  });

  it('should return 404 when a route that doesnt exist is hit' ,(done) => {
    mockRequest
      .get('/bad')
      .then(res => expect(res.status).toBe(404));
    done();
  });
});

// TOKEN TESTING _________________________

describe('Token testing', () => {
  let token;

  const userObj = {
    username: 'Natalie',
    password: 'secretSecretsAreNoFun',
  };

  it('should generate a token', () => {
    token = new User().generateToken(userObj);
    expect(token).toBeDefined();
  });
});


