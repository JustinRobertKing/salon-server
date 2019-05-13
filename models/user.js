let bcrypt = require('bcryptjs');
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  lastname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  referral: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  phone: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
	stylist: {
    type: Boolean,
    required: true,
    default: false
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
  },
  consultation: {
    type: Array,
    required: false
  },
  stylist_id: {
    type: String,
    required: false
  },
  salon_id: {
    type: String,
    required: false
  },
  manager: {
    type: Boolean,
    required: true,
    default: false
  },
});

// Override 'toJSON' to prevent the password from being returned with the user
// You can white list OR black list parts of the schema
userSchema.set('toJSON', {
  transform: (doc, user) => {
    // BLACKLIST:
    // delete user.password
    // return user
    // WHITELIST:
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      referral: user.referral,
      phone: user.phone,
      stylist: user.stylist,
      stylist_id: user.stylist_id,
      salon_id: user.salon_id,
      manager: user.manager,
      consultation: user.consultation,
      firstname: user.firstname
    }
  }
})

// A helper function to authenticate with bcrypt
userSchema.methods.authenticated = function(password) {
  return bcrypt.compareSync(password, this.password)
}

// This is Mongoose's version of a beforeCreate hook
userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

// Exporting the User model
module.exports = mongoose.model('User', userSchema);
