let mongoose = require('mongoose')

let clientSchema = new mongoose.Schema({
	userId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	stylist:{
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Client'
	},
})

module.exports = mongoose.model('client', clientSchema)