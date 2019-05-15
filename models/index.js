// Mongoose require and connect
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cutcut',
  { useNewUrlParser: true });

// Deprecation warning: https://github.com/Automattic/mongoose/issues/6922
mongoose.set('useCreateIndex', true);

// Include models from this folder
module.exports.User = require('./user');
module.exports.Appointment = require('./appointment');
module.exports.Client = require('./client');
module.exports.Consultation = require('./consultation');
module.exports.Message = require('./message');
module.exports.Salon = require('./salon');
module.exports.Stylist = require('./stylist');

