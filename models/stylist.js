let mongoose = require('mongoose')

let stylistSchema = new mongoose.Schema({
	userId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	client:{
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Client'
	},
	salon:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Salon'
	},

})

module.exports = mongoose.model('stylist', stylistSchema)