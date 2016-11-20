'use strict';

const config = require('./config.js');
const logger = require('loglevel');
logger.setLevel(config.get('log:level'));

module.exports = logger;
