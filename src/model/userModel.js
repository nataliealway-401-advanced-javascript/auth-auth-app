'use strict';

const schema = require('./userSchema.js');
const dataModel = require('./dataModel.js');
const jwt = require('jasonwebtoken');
const bcrypt = require('bcryptjs');

let SECRET = process.env.SECRET;

//Base for the User class
class User extends dataModel {
    constructor() {
        super(schema);
    }

    //Generate a jwt token for user

    generateToken() {
        let token = jwt.sign({username: this.username}, SECRET)
        return token;
    }

    //Find header in the database and compares the passwords

async authenticate(user, pass) {
    let test = await schema.find({username: user});
    let storedPassword = test[0].password;

    let valud = bcrypt.compare(pass, storedPassword);
    return valid ? user: Promise.reject();
 }
}


module.exports = new User();