require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

router.post('/', (req, res) => {


	db.Consultation.find({
		stylist: req.body.userId.id
	})
		.populate({path:'client', populate: {path:'user'}})


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
	console.log('In the GET /landing/client route')
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

router.post('/appointment', (req, res) => {
	console.log('In the POST /landing/appointment route')
	db.Appointment.find({
		stylist: req.body.userId.id
	})
	// .populate('client')
	// .populate('stylist')
	.then(foundAppointments => {
		console.log('found', foundAppointments)
		res.send(foundAppointments)
	})
	.catch((error) => {
		console.log('Error when finding appointments', error)
		res.status(500).send({ message: 'Error finding appointments'})
	});
})

module.exports = router;
