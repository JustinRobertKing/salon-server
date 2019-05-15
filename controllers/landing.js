require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

router.post('/', (req, res) => {
	console.log('In the GET /profile route')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log(req.body.userId.id)
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	console.log('')
	db.Consultation.find({
		stylist: req.body.userId.id
	})
	// .populate('client')
	// .populate('stylist')
	.then(foundConsultations => {
		console.log('found', foundConsultations)
		res.send(foundConsultations)
	})
	.catch((error) => {
		console.log('Error when finding consultations', error)
		res.status(500).send({ message: 'Error finding consultations'})
	});
})

router.get('/client', (req, res) => {
	console.log('In the GET /profile route')
	db.Client.findOne({
		id: req.user._id,
	})
	.then(foundConsultations => {
		console.log('found', foundConsultations)
		res.send(foundConsultations)
	})
	.catch((error) => {
		console.log('Error when finding consultations', error)
		res.status(500).send({ message: 'Error finding consultations'})
	});
})

router.post('/appointments', (req, res) => {
	db.Appointment.create({
		start: 1557798958,
		length: 89340,
		stylist: '5cdb374f0f506034a72e6bd7',
		client: '5cdb374f0f506034a72e6bd7'
	})
	.then(createdConsultation => {
		console.log('created consultation', createdConsultation)
		res.send({ createdConsultation });
	})
	.catch((error) => {
		console.log('Error when creating consultation', error)
		res.status(500).send({ message: 'Error creating consultation'})
	});
})

module.exports = router;
