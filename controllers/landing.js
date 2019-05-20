require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

router.post('/', (req, res) => {
//only unapproved consultations
	db.Stylist.findOne({
		user: req.body.userId.id,
	})
	.then(foundUser=>{

		db.Consultation.find({
			stylist: foundUser,
			approved: false
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
		})

router.post('/consultationsApproved', (req, res) => {
//only approved consultations
	db.Stylist.findOne({
		user: req.body.userId.id
		
	})
	.then(foundUser=>{

		db.Consultation.find({
			stylist: foundUser,
			approved: true
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
})


router.post('/client', (req, res) => {
	db.Client.findOne({
		user: req.body.userId.id
	})
	.then(foundUser=>{

		db.Consultation.find({
			client: foundUser
		})
		.populate({path:'client', populate: {path:'user'}})
		.populate({path:'stylist', populate: {path:'user'}})
		.then(foundConsultations => {
			console.log('found--------->', foundConsultations)
			res.send(foundConsultations)
		})
		.catch((error) => {
			console.log('Error when finding consultations', error)
			res.status(500).send({ message: 'Error finding consultations'})
		});

	})
})


router.get('/client', (req, res) => {
	console.log('In the GET /landing/client route')
	db.Client.findOne({
		id: req.user._id,
	})
	.then(foundConsultations => {
		console.log('')
	console.log('')
	console.log('')
	console.log('')
		console.log('found', foundConsultations)
		console.log('')
	console.log('')
	console.log('')
	console.log('')
		res.send(foundConsultations)
	})
	.catch((error) => {
		console.log('Error when finding consultations', error)
		res.status(500).send({ message: 'Error finding consultations'})
	});
})

router.get('/', (req, res) => {
	console.log('In the GET /landing/ route')
	db.Stylist.findOne({
		id: req.user._id,
	})
	.populate([{
		path: 'client',
		model: 'Client',
		populate: {
			path: 'user',
			model: 'User'
		},
	}])
	.then(foundStylist => {
		console.log('')
	console.log('')
	console.log('')
	console.log('')
		console.log('found', foundStylist)
		console.log('')
	console.log('')
	console.log('')
	console.log('')
		res.send(foundStylist)
	})
	.catch((error) => {
		console.log('Error when finding consultations', error)
		res.status(500).send({ message: 'Error finding consultations'})
	});
})

router.post('/appointment', (req, res) => {
	console.log('In the POST /landing/appointment route')
	db.Stylist.findOne({
		user: req.body.userId.id,
	})
	.then(foundUser=>{
		db.Appointment.find({
			stylist: foundUser
		})
		.populate({path:'client', model: 'Client', populate: {path:'user', model: 'User'}})
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

module.exports = router;
