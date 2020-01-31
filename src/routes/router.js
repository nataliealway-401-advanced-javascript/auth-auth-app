'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../auth/auth-middleware.js');
const User = require('../model/userModel.js');
/**
 * @param  {} '/users'
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.get('/users', (req, res, next) => {
  User.get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.json(output);
    });
});
  
/**
 * @param  {} '/signup'
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.post('/signup', (req, res, next) => {
  let userData = {
    username: req.body.username,
    password: req.body.password,
  };
  
  /**
   * User.post
   * @param  {} userData
   */
  User.post(userData)
    .then(user => {
      let token = User.generateToken(user);
      res.send(token);
    })
    .catch(error => res.send('Error'));
});
  
  
/**
 * @param  {} '/signin'
 * @param  {} basicAuth
 * @param  {} req
 * @param  {} res
 * @param  {} next

 */
router.post('/signin', basicAuth, (req, res, next) => {
  res.send(req.token);
});
  
  
module.exports = router;