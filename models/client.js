let mongoose = require('mongoose')

let clientSchema = new mongoose.Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	stylist:{
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Client'
	},
})

module.exports = mongoose.model('Client', clientSchema)