let mongoose = require('mongoose')

let availabilitySchema = new mongoose.Schema({
	0: [],
	1: [],
	2: [],
	3: [],
	4: [],
	5: [],
	6: [],
})

let stylistSchema = new mongoose.Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	client:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	}],
	salon:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Salon'
	},
	availability: availabilitySchema
})





module.exports = mongoose.model('Stylist', stylistSchema)