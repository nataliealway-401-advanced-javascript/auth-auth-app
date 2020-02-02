'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../auth/auth-middleware.js');
const oauth = require('../auth/oauth/github.js');
const users = require('../model/userModel.js');
/**
 * get users route
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.get('/users', (req, res, next) => {
  users.get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.json(output);
    });
});
  

/**
 * /signup route
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.post('/signup', async (req, res, next) => {
  try {
    let user = await users.save(req.body);
    let token = users.generateToken(user);
    res.status(200).send(token);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }

});
    
/**
 * /signin route
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
router.post('/signin', basicAuth, (req, res, next) => {
  res.send(req.token);
});

/**
 * /oauth route
 * @param  {} req
 * @param  {} res
 */
router.get('/oauth', oauth, (req, res) => {
  res.send(req.token);
});
  
  
module.exports = router;