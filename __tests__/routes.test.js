'use strict';

const {server} = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');

describe('Route Testing', () => {

  let userObj = {
    username: 'NatalieIsAwesome',
    password: 'ForTestingPurposes',
  };

  let tokenID;

  it('/signup route creates new user', () => {
    return mockRequest.post('/signup')
      .send(userObj)
      .then(data => {
        let token = jwt.verify(data.text, 'secretsSecretsAreNoFun');
        tokenID = token;
        expect(token).toBeDefined();
      });
  });

  xit('/signin authenticates user', () => {
    return mockRequest.post('/signin')
      .auth(userObj.username, userObj.password)
      .then(results => {
        let token = jwt.verify(results.text, 'secretsSecretsAreNoFun');
        expect(token).toEqual(tokenID);
      });
  });

  it('throws an error with a invalid object', () => {
    return mockRequest.post('/signup')
      .send({name: 'incorrect', password: 5})
      .then(data => {
        expect(data.text).toEqual('Error');
      });
  });


  it('/users route returns all users', () => {
    return mockRequest.get('/users')
      .then(data => {
        expect(data.body.count).toEqual(1);
      });
  });


  it('Returns invalid loging with invalid headers', () => {
    return mockRequest.post('/signin')
      .auth(userObj)
      .then(results => {
        expect(results.status).toEqual(500);
      });
  });
});