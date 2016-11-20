'use strict';

const logger = require('./util/log.js');
const botstore = require('./bot.store.js');
const discord = require('./discord.js');

logger.info('Starting FSI bot');
botstore.load()
    .then((bots) => {
        logger.info(`Successfully loaded ${bots.length} bots: ${bots.join(', ')}`);
        logger.info('Connecting to Discord, here we go!');
        return discord.start();
    })
    .then(() => {
        logger.info('Successfully connected to Discord, let\'s party!');
    })
    .catch((err) => {
        logger.error(`Failed to connect to Discord: ${err}`);
    });
