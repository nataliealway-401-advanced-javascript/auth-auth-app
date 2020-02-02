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

  async save(record){
    let {username, password} = record;
    password = await bcrypt.hash(password, 5);
    let hashed = { username: username, password: password };    
    this.post(hashed);
    // console.log('HEYYYYYYYYYYY!!!!', record);   
    return record;
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
  async authenticateBasic(user, pass) {
    let getUser = await schema.find({username: user});
    let storedPassword = getUser[0].password;

    let valid = bcrypt.compare(pass, storedPassword);
    return valid ? user: Promise.reject();
  }
}


module.exports = new User();