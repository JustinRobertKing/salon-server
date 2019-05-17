require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

// POST /Appointment route - create a Appointment in the database
router.post('/', (req, res) => {
	console.log('In the POST /Appointment route', req.body);
	db.Appointment.create({
		stylist: req.body.stylist,
		client: req.body.client,
		start: req.body.start,
		apptLength: req.body.apptLength,
		end: req.body.end,
		date: req.body.date,
		notes: req.body.notes,
		approved: req.body.approved
	})
	.then(createdAppointment => {
		console.log('created Appointment', createdAppointment)
		res.send({ createdAppointment });
	})
	.catch((error) => {
		console.log('Error when creating Appointment', error)
		res.status(500).send({ message: 'Error creating Appointment'})
	});
})

// PUT /Appointment/display - update Appointment with stylist response
router.put('/apptdisplay', (req, res) => {
	console.log('In the POST /Appointment/display route');
	console.log(req.body)
	db.Appointment.findOneAndUpdate({ 
		_id: req.body.AppointmentID
	},
		req.body,
		{ new: true, useFindAndModify: false }
	)
		.then(updatedAppointment => {
			console.log('updated appointment', updatedAppointment)
			res.send({ updatedAppointment });
		})
		.catch((error) => {
			console.log('Error when creating Appointment', error)
			res.status(500).send({ message: 'Error creating Appointment'})
		});
});

module.exports = router;