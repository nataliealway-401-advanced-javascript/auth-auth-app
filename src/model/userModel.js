'use strict';

const schema = require('./userSchema.js');
const dataModel = require('@trevorthompson/mongo-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let SECRET = 'secretsSecretsAreNoFun';

/**
 * @class User
 * User class extends dataModel
 */
class User extends dataModel {
  constructor() {
    super(schema);
  }


  /**
   * generateToken() -> generates a jsonwebtoken for user
   * @param  {} SECRET
   * @returns token
   */
  generateToken() {
    let token = jwt.sign({username: this.username}, SECRET);
    return token;
  }
  
  /**
   * authenticate() -> async function that finds header in database and compares the passwords
   * @param  {} user
   * @param  {} pass
   * @returns authenticated user
   */
  async authenticate(user, pass) {
    let test = await schema.find({username: user});
    let storedPassword = test[0].password;

    let valid = bcrypt.compare(pass, storedPassword);
    return valid ? user: Promise.reject();
  }
}


module.exports = new User();