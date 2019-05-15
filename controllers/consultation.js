require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

// POST /consultation route - create a consultation in the database
router.post('/', (req, res) => {
	console.log('In the POST /consultation route');
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
})

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

module.exports = router;
