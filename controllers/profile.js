require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

router.post('/client', (req, res) => {
	
	db.Client.findOne({
		user: req.body.userId.id
	})
	// .populate({path:'stylist', populate: {path:'user'}})

	.then(foundUser=>{
			console.log('found--------->', foundUser)
			res.send(foundUser)
		})
		.catch((error) => {
			console.log('Error when finding consultations', error)
			res.status(500).send({ message: 'Error finding consultations'})
		});

})