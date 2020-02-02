'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../auth/auth-middleware.js');
const oauth = require('../auth/oauth/github.js');
const users = require('../model/userModel.js');

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
  

router.post('/signup', async (req, res, next) => {
  try {
    let user = await users.save(req.body);
    let token = users.generateToken(user);
    res.status(200).send(token);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }

});
    

router.post('/signin', basicAuth, (req, res, next) => {
  res.send(req.token);
});

router.get('/oauth', oauth, (req, res) => {
  res.send(req.token);
});
  
  
module.exports = router;