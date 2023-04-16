const express = require('express');
const config = require('config');
const logger = require('./middleware/logger');
app = express();

// database configurations.
require('./startup/database')();
// router configurations.
require('./startup/routes')(app);

// define and running port
const port = config.get('PORT') || 8080;
server = app.listen(port, () =>
	logger.info(`Server is running on port ${port}`)
);

module.exports = server;