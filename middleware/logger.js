const config = require('config');
const bunyan = require('bunyan');

const level = config.get('LOG_LEVEL') || 'info';

const log = bunyan.createLogger({
	name: config.get('APPNAME'),
	streams: [
		{
			level,
			stream: process.stdout,
		},
		{
			level,
			path: config.get('LOG_FILE_PATH'),
		},
	],
});

module.exports = log;