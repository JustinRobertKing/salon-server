require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

// POST /auth/login route - returns a JWT
router.post('/login', (req, res) => {
	console.log('In the POST /auth/login route');
	console.log(req.body);
	db.User.findOne({ email: req.body.email })
	.then(user => {
		// Make sure there is both a user and a password
		if (!user || !user.password) {
			return res.status(404).send({ message: 'User Not Found' })
		}
		// The user exists - now let's check their password
		if (!user.authenticated(req.body.password)) {
			// Invalid user credentials (bad password)
			return res.status(406).send({ message: 'Unacceptable' })
		}
		// Valid user, good password, now we need to give them a token
		const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
			expiresIn: 60 * 60 * 24 // 24 hours (in seconds)
		});
		// Send the token
		res.send({ token })
	})
	.catch((error) => {
		console.log('Error when finding user in POST /auth/login', error)
		return res.status(503).send({ message: 'Database Error' })
	})
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', (req, res) => {
	console.log('In the POST /auth/signup route');
	console.log(req.body);
	db.User.findOne({ email: req.body.email })
	.then(user => {
		// If the user exists, do not let them create a duplicate account
		if (user) {
			res.status(409).send({ message: 'Email address already in use' })
		}
		// Good - they don't exist yet
		db.User.create(req.body)
		.then(createdUser => {
			// We created a user. Make a token; send it.
			const token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
				expiresIn: 60 * 60 * 24 // 24 hours (in seconds)
			});
			res.send({ token });
		})
		.catch((error) => {
			console.log('Error when creating user', error)
			res.status(500).send({ message: 'Error creating user'})
		});
	})
	.catch((error) => {
		console.log('Error in POST /auth/signup', error);
		return res.status(503).send({ message: 'Database Error' })
	})
});

// This is what is returned when client queries for new user data
router.post('/current/user', (req, res) => {
	console.log('In the current user route', req.user)
	if (!req.user || !req.user.id) {
		return res.status(401).send({ message: 'Unauthorized' })
	}
	// NOTE: This is the user data from the time the token was issued
	// WARNING: If you update the user, those changes will not be reflected here
	// To avoid this, reissue a token when the user data is changed
	res.send({ user: req.user })
});

module.exports = router;
