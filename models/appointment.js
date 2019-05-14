let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
	start:{
		type: Date,
		required:false
	},
	end:{
		type: Date,
		required:false
	},
	stylist:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	client:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Stylist'
	}
})

module.exports = mongoose.model('Book', bookSchema)