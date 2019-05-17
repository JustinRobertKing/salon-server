let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
	date: {
		type: Number,
		required: true
	},
	start:{
		type: Number,
		required: true
	},
	end: {
		type: Number,
		required: true
	},
	apptLength:{
		type: Number,
		required: true
	},
	stylist:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	client:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Stylist'
	},
	notes: String,
	approved: Boolean
})

module.exports = mongoose.model('Appointment', appointmentSchema)