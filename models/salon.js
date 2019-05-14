let mongoose = require('mongoose')

let salonSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	manager:{
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
	details:{
		type: String,
		required: true
	},

})

module.exports = mongoose.model('salon', salonSchema)