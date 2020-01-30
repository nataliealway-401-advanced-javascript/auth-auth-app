'use strict';

const {server} = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');

describe('Route Testing', () => {

  let userObj = {
    username: 'Natalie',
    password: 'ForTestingPurposes',
  };

  let tokenID;

  it('/Signup route creates new user', () => {
    return mockRequest.post('/signup')
      .send(userObj)
      .then(data => {
        let token = jwt.verify(data.text, 'secretsSecretsAreNoFun');
        tokenID = token.iat;
        expect(token.iat).toBeDefined();
      });
  });


  it('/users returns all users', () => {
    return mockRequest.get('/users')
      .then(data => {
        expect(data.body.count).toEqual(1);
      });
  });


  it('Returns invalid login when wrong header', () => {
    return mockRequest.post('/signin')
      .auth(userObj)
      .then(results => {
        expect(results.status).toEqual(500);
      });
  });
});