'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
/**
 * The schema for a user record
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});

//Hash the password before saving it to the database
userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});


module.exports = mongoose.model('user', userSchema);