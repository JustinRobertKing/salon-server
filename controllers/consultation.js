require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const db = require('../models')

// POST /consultation/display route - create a user in the DB and then log them in
router.post('/display', (req, res) => {
	console.log('In the POST /consultation/display route');
	console.log(req.body);
		// db.Consultation.create(req.body)
		// .then(createdConsultation => {
		// 	console.log('created consult', createdConsultation)
		// 	res.send({ createdConsultation });
		// })
		// .catch((error) => {
		// 	console.log('Error when creating consultation', error)
		// 	res.status(500).send({ message: 'Error creating consultation'})
		// });
});

module.exports = router;
