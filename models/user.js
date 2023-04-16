const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			trim: true,
			required: true,
			max: 32,
			unique: true,
			index: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			max: 32,
		},
		password:{
			type:String
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamp: true }
);
module.exports = mongoose.model('User', userSchema);