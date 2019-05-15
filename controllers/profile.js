require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

router.get('/', (req, res) => {
	console.log('In the GET /profile route')
	db.Consultation.find({
		stylist: '5cdb374f0f506034a72e6bd7',
		approved: false
	})
	.then(foundConsultations => {
		res.send(foundConsultations)
	})
	.catch((error) => {
		console.log('Error when finding consultations', error)
		res.status(500).send({ message: 'Error finding consultations'})
	});
})

module.exports = router;
