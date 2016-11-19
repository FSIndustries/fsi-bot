'use strict';

const logger = require('./log.js');
const botstore = require('./botstore.js');
const discord = require('./discord.js');

logger.info('Starting FSI bot');
botstore.load()
    .then((bots) => {
        logger.info(`Successfully loaded ${bots.length} bots: ${bots.join(', ')}`);
    })
    .then(() => {
        logger.info('Connecting to Discord');
        return discord.start(botstore.emitter);
    })
    .then(() => {
        logger.info('Successfully connected to Discord, let\'s party!');
    })
    .catch((err) => {
        logger.error(`Failed to connect to Discord: ${err}`);
    });
