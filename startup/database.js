const mongoose = require('mongoose');
const logger = require('../middleware/logger');
const config = require('config');
// database details. and database connections module.
module.exports = async () => {
	try {
		await mongoose.connect(config.get('DATABASE_HOST'), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		logger.info(
			'connected to database successfully. ' +
				`DATABASE HOST IS ${config.get('DATABASE_HOST')}`
		);
	} catch (ex) {
		logger.debug(ex);
		logger.error(
			'can not connect to database. ' +
				ex.message +
				`DATABASE HOST IS ${config.get('DATABASE_HOST')}`
		);
	}
};