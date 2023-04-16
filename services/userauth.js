const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../middleware/logger');
const config = require('config');

exports.signIn = async (email, password) => {
	logger.info('service - auth - SignIn - start');
	logger.debug(`service - auth - SignIn, email  is ${email}`);
	try {
		const user = await User.findOne({ email, isActive: true });
		if (!user)
			return {
				error: 'email and password do not match.',
				status: false,
				errorCode: 404,
			};
		// if user found the check the password
		if (user.password != password) {
			return {
				error: 'email and password do not match.',
				status: false,
				errorCode: 404,
			};
		}
		//generate a token and send it to client.
		//
		const token = jwt.sign(
			{ _id: user._id},
			config.get('JWT_SECRET'),
			{
				expiresIn: config.get('JWT_EXPIRE_TIME'),
			}
		);
		logger.debug(`token ${token}`);
		return { user, token, status: true };
	} catch (ex) {
		logger.info(ex.message);
		logger.debug(ex);
		logger.info('service - auth - SignIn - end');
		return { error: ex.message, status: false, errorCode: 500 };
	}
};