const mongoose = require('mongoose');
const crypto = require('crypto');

const contactSchema = mongoose.Schema(
	{
		
		name: {
			type: String,
			trim: true,
			max: 32,
		},
		phone:{
			type:Number
		}
	},
	{ timestamp: true }
);
module.exports = mongoose.model('Contact', contactSchema);