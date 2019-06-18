let mongoose = require('mongoose')

let messageSchema = new mongoose.Schema({
	stylist:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Stylist'
	},
	client:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	chat:{
		type: [{
			msg: {
				type: String,
				required:false
			},
			time: {
				type: Date,
				required:false
			},
			person: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}

		}],
		required:false
	},
})

module.exports = mongoose.model('Message', messageSchema)