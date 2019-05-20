require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

// POST /consultation route - create a consultation in the database
router.post('/', (req, res) => {
	console.log('In the POST /consultation route');
	

	db.Consultation.create({
		stylist: req.body.stylist,
		client: req.body.client,
		currentHair: req.body.currentHair,
		dreamHair: req.body.dreamHair,
		clientComment: req.body.clientComment,
		approved: false,
		scheduled: false
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


// DELETE /consultation/display - update consultation with stylist response
router.delete('/', (req, res) => {
	
	db.Consultation.deleteOne({ 
		_id: req.body._id
	}
	)
		.then(deletedConsultation => {
			console.log('Delted consult', deletedConsultation)
		})
		.catch((error) => {
			console.log('Error when creating consultation', error)
			res.status(500).send({ message: 'Error creating consultation'})
		});
});


// PUT /consultation/display - update consultation with stylist response
router.put('/display', (req, res) => {
	console.log('In the POST /consultation/display route');
	console.log(req.body)
	db.Consultation.findOneAndUpdate({ 
		_id: req.body.consultationID
	},
		req.body,
		{ new: true, useFindAndModify: false }
	)
	.then(createdConsultation => {
		console.log('created consult', createdConsultation)
		res.send({ createdConsultation });
	})
	.catch((error) => {
		console.log('Error when creating consultation', error)
		res.status(500).send({ message: 'Error creating consultation'})
	});
});

// PUT /consultation/display - update consultation with stylist response
router.put('/scheduled', (req, res) => {
	console.log('In the POST /consultation/display route');
	console.log(req.body)
	db.Consultation.findOneAndUpdate({ 
		_id: req.body.consultationID
	},{
		scheduled: true
	},
	{ new: true, useFindAndModify: false }
	)
	.then(createdConsultation => {
		console.log('created consult', createdConsultation)
		res.send({ createdConsultation });
	})
	.catch((error) => {
		console.log('Error when creating consultation', error)
		res.status(500).send({ message: 'Error creating consultation'})
	});
});

module.exports = router;
