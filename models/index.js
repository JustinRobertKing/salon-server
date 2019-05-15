// Mongoose require and connect
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cutcut',
  { useNewUrlParser: true });

// Deprecation warning: https://github.com/Automattic/mongoose/issues/6922
mongoose.set('useCreateIndex', true);

// Include models from this folder
module.exports.User = require('./user');
module.exports.Consultation = require('./consultation');
// module.exports.User = require('./user');
// module.exports.User = require('./user');
// module.exports.User = require('./user');
// module.exports.User = require('./user');
