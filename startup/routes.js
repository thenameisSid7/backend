const express = require('express');
const config = require('config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('../middleware/logger');
const users = require('../routes/user');
const userauth = require('../routes/userauth');
const contact = require('../routes/contact');
const verifyToken = require('../middleware/auth');

// routing module.
module.exports = function (app) {
	logger.debug('inbuilt middleware loading');
	app.use(cors({ origin: `${config.get('CLIENT_APPLICATION_URL')}` }));
	logger.info(`configured cors for ${config.get('CLIENT_APPLICATION_URL')}`);
	// app.use(cors());
	app.use(express.json({ limit: '200mb' }));
	app.use(cookieParser());
	// for url endcoded froms
	app.use(express.urlencoded({ limit: '20mb', extended: true }));
	logger.info('routes loading...');
	const api_prefix = `/api/${config.get('API_VERSION')}`;
	//APIS
	// app.use(`${api_prefix}/users`, users);
	app.use(`${api_prefix}/user/auth`, userauth);
	app.use(`${api_prefix}/contact`,contact)
};