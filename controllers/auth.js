require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

//include code gen
var CodeGenerator = require('node-code-generator');
var generator = new CodeGenerator();
var pattern = 'ABC#+';
var howMany = 100;
var options = {};


// POST /auth/login route - returns a JWT
router.post('/login', (req, res) => {
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
	db.User.findOne({ email: req.body.email })
	.then(user => {
		// If the user exists, do not let them create a duplicate account
		if (user) {
			res.status(409).send({ message: 'Email address already in use' })
		}
		// Good - they don't exist yet
		//gen a code
		var myCode = generator.generateCodes('######', 1);
		console.log("myCode--------", myCode[0])
		//check db for that code
		db.User.findOne({
			referral: myCode[0]
		})
		.then(results=>{
			//this only changes once, but does not check again.  
			//Should make into its own function, and keep calling it until you win
			if (results) {
				console.log('CODE IN USE, MAKE ANOTHER')
				myCode = generator.generateCodes('######', 1);
				console.log("NEW myCode--------", myCode[0])
			} 
		})
		//create a user
		db.User.create({
			firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      referral: myCode,
      phone: req.body.phone,
      stylist: req.body.stylist, 
      referralLink: req.body.referralLink
		})
		.then(createdUser => {
			// We created a user. Make a token; send it.
			const token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
				expiresIn: 60 * 60 * 24 // 24 hours (in seconds)
			});
			res.send({ token });
			let uid = createdUser._id
			//is this a client, or a stylist?
			if (req.body.stylist === 'true'){
				//make stylist collection entry
				db.Stylist.create({ 
					user: uid
				})
				.catch((error) => {
					console.log('Error when creating user', error)
					res.status(500).send({ message: 'Error creating 2nd step of user'})
				});
			} else if (req.body.stylist === 'false') {
				//check to see if they entered a referral				
				if (req.body.referralLink){
					// find the USER by referral
					db.User.findOne({
						referral: req.body.referralLink
					})
					// find the Stylist from the result
					.then(foundUser =>{
						db.Stylist.findOne({
							user: foundUser._id
						})
						//create the client with the user info + stylist id
						.then(foundStylist =>{
							//make client collection entry
							db.Client.create({ 
								user: uid,
								stylist: foundStylist._id
							})
							//add the client to the stylist
							.then(createdClient=>{
								db.Stylist.findOneAndUpdate(
									//Search Params
									{	_id: createdClient.stylist },
									//what to add
									{$addToSet : { client: createdClient._id }},
									//options
									{ safe: true, upsert: true },
									function(err, model) {
					        	console.log(err);
					    		}
								)
								.then(updatedStylist=>{
										console.log('updatedStylist------',updatedStylist)
								})
							})
						})
					})
					.catch((error) => {
						console.log('Error when creating user', error)
						res.status(500).send({ message: 'Error creating 2nd step of user'})
					});
				}
			}
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
	if (!req.user || !req.user.id) {
		return res.status(401).send({ message: 'Unauthorized' })
	}
	// NOTE: This is the user data from the time the token was issued
	// WARNING: If you update the user, those changes will not be reflected here
	// To avoid this, reissue a token when the user data is changed
	res.send({ user: req.user })
});

module.exports = router;
