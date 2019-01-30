const express = require('express');
const router = express.Router();

// POST /auth/login route - returns a JWT
router.post('/login', (req, res) => {
  res.send('POST /auth/signup');
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', (req, res) => {
  res.send('POST /auth/signup');
});

// This is what is returned when client queries for new user data
router.get('/current/user', (req, res) => {
  res.send('GET /auth/current/user STUB');
});

module.exports = router;
