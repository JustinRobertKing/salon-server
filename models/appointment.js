let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
	start:{
		type: Number,
		required:true
	},
	length:{
		type: Number,
		required:true
	},
	stylist:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	client:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Stylist'
	}
})

module.exports = mongoose.model('Appointment', appointmentSchema)