require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const expressJWT = require('express-jwt');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');
const app = express();


// Set up middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));

// Controllers
app.use('/auth', expressJWT({
  secret: process.env.JWT_SECRET,
  getToken: function fromRequest(req){
    if(req.body.headers.Authorization &&
      req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
      return req.body.headers.Authorization.split(' ')[1];
    }
    return null;
  }
}).unless({
  path: [
    { url: '/auth/login', methods: ['POST'] },
    { url: '/auth/signup', methods: ['POST'] }
  ]
}), require('./controllers/auth'));

app.get('*', function(req, res, next) {
	res.send({ message: 'Unknown Route' });
});

app.listen(process.env.PORT || 3000);
