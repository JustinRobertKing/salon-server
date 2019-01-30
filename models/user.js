var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 99
  }
});

// TODO: Override 'toJSON' to prevent the password from being returned with the user


// TODO: A helper function to authenticate with bcrypt


// TODO: Find out Mongoose's version of a beforeCreate hook


// Exporting the User model
module.exports = mongoose.model('User', userSchema);
