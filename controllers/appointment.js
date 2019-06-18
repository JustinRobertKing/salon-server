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

// PUT /Appointment/apptdisplay - update Appointment with stylist response
router.put('/apptdisplay', (req, res) => {
	console.log('In the POST /Appointment/display route');
	console.log(req.body)
	db.Appointment.findOneAndUpdate({ 
		_id: req.body.appointmentID
	}, {
		approved: true
	}, { 
		new: true, 
		useFindAndModify: false 
	})
	.then(updatedAppointment => {
		console.log('updated appointment', updatedAppointment)
		res.send({ updatedAppointment });
	})
	.catch((error) => {
		console.log('Error when creating Appointment', error)
		res.status(500).send({ message: 'Error creating Appointment'})
	});
});

router.post('/day/stylist', (req, res) => {
	console.log('In the POST /appointment/day/stylist route', req.body)
	db.Stylist.findOne({
		user: req.body.userId.id,
	})
	.then(foundUser=>{
		db.Appointment.find({
			stylist: foundUser,
			date: req.body.date
		})
		.populate({path:'client', model: 'Client', populate: {path:'user', model: 'User'}})
		.populate({path:'stylist', model: 'Stylist', populate: {path:'user', model: 'User'}})
		.then(foundAppointments => {
			console.log('found', foundAppointments)
			res.send(foundAppointments)
		})
		.catch((error) => {
			console.log('Error when finding appointments', error)
			res.status(500).send({ message: 'Error finding appointments'})
		});
	})
})

router.post('/day/client', (req, res) => {
	console.log('In the POST /appointment/day/client route')
	db.Client.findOne({
		user: req.body.userId.id,
	})
	.then(foundClient => {
		db.Stylist.findOne({
			client: foundClient._id
		})
		.then(foundUser=>{
			db.Appointment.find({
				stylist: foundUser,
				date: req.body.date
			})
			.populate({path:'client', model: 'Client', populate: {path:'user', model: 'User'}})
			.populate({path:'stylist', model: 'Stylist', populate: {path:'user', model: 'User'}})
			.then(foundAppointments => {
				console.log('found', foundAppointments)
				res.send(foundAppointments)
			})
			.catch((error) => {
				console.log('Error when finding appointments', error)
				res.status(500).send({ message: 'Error finding appointments'})
			});
		})
	})
})

// PUT /appointment/availability - update availability
router.put('/availability', (req, res) => {
	console.log('In the PUT /availability route');
	console.log(req.body)
	db.Stylist.findOneAndUpdate({ 
		user: req.body.stylistUser.id
	}, {
		availability: {
			0: [req.body.check1, req.body.start1, req.body.end1],
			1: [req.body.check2, req.body.start2, req.body.end2],
			2: [req.body.check3, req.body.start3, req.body.end3],
			3: [req.body.check4, req.body.start4, req.body.end4],
			4: [req.body.check5, req.body.start5, req.body.end5],
			5: [req.body.check6, req.body.start6, req.body.end6],
			6: [req.body.check7, req.body.start7, req.body.end7],
		}
	}, { 
		new: true, 
		useFindAndModify: false 
	})
	.then(updatedAvailability => {
		console.log('updated Availability', updatedAvailability)
		res.send({ updatedAvailability });
	})
	.catch((error) => {
		console.log('Error when creating Availability', error)
		res.status(500).send({ message: 'Error creating Availability'})
	});
});

router.post('/availability/client', (req, res) => {
	db.Client.findOne({
		user: req.body.userId.id,
	})
	.then(foundClient => {
		db.Stylist.findOne({
			client: foundClient._id
		})
		.then(stylist => {
			console.log('blockouts', stylist)
			res.send(stylist)
		})
		.catch((error) => {
			console.log('Error', error)
			res.status(500).send({ message: 'Error getting blockouts'})
		})
	})
	.catch((error) => {
		console.log('Error', error)
		res.status(500).send({ message: 'Error getting blockouts'})
	})
})

router.post('/availability', (req, res) => {
	db.Stylist.findOne({
		user: req.body.userId.id,
	})
	.then(stylist => {
		console.log('blockouts', stylist)
		res.send(stylist)
	})
	.catch((error) => {
		console.log('Error', error)
		res.status(500).send({ message: 'Error getting blockouts'})
	});
})

module.exports = router;