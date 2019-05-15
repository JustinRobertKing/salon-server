require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

// POST /consultation route - create a consultation in the database
router.post('/', (req, res) => {
	console.log('In the POST /consultation route');
	res.send(req.body)
})

router.get('/display', (req, res) => {
	console.log('In the GET /consultation/display route')
	db.Consultation.find({
		stylist: '5cdb374f0f506034a72e6bd7',
		client: '5cdb374f0f506034a72e6bd7'
	})
	.then(foundConsultations => {
		res.send(foundConsultations)
	})
	.catch((error) => {
		console.log('Error when finding consultations', error)
		res.status(500).send({ message: 'Error finding consultations'})
	});
})
// PUT /consultation/display - update consultation with stylist response
router.post('/display', (req, res) => {
	console.log('In the POST /consultation/display route');
	// res.send(req.body)
	db.Consultation.create({
		stylist: '5cdb374f0f506034a72e6bd7',
		client: '5cdb374f0f506034a72e6bd7',
		currentHair: [
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg',
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg',
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg',
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg',
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg'
		],
		dreamHair: [
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg',
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg',
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg',
			'https://www.justcuts.com.au/media/500/Sea-salt-hair-tip.0.jpg'
		],
		clientComment: 'Pig pancetta bresaola, short loin beef pastrami kielbasa. Ball tip turkey shank bacon. Cow ground round sausage, buffalo bresaola prosciutto porchetta beef ribs short loin. Flank ribeye doner salami capicola. Andouille pig salami corned beef shoulder beef spare ribs venison. Filet mignon short loin strip steak tenderloin capicola.'
	})
	.then(createdConsultation => {
		console.log('created consultation', createdConsultation)
		res.send({ createdConsultation });
	})
	.catch((error) => {
		console.log('Error when creating consultation', error)
		res.status(500).send({ message: 'Error creating consultation'})
	});
	// db.consultation.findOneAndUpdate(
	// 	{ _id: req.params.id },
	// 	req.body,
	// 	{ new: true, useFindAndModify: false }
	// )
	// 	.then(createdConsultation => {
	// 		console.log('created consult', createdConsultation)
	// 		res.send({ createdConsultation });
	// 	})
	// 	.catch((error) => {
	// 		console.log('Error when creating consultation', error)
	// 		res.status(500).send({ message: 'Error creating consultation'})
	// 	});
});

module.exports = router;
