'use strict';

const fs = require('fs');
const _ = require('lodash');
const logger = require('./util/log.js');
const botEmitter = require('./bot.emitter.js');

const botDir = `${__dirname}/bots`;
const bots = {};

module.exports = {

    load: () => {

        _.each(fs.readdirSync(botDir), (file) => {
            try {
                bots[file] = botEmitter.registerBot(require(`${botDir}/${file}`));
                return file;
            } catch (err) {
                logger.error(`Failed to load ${file}: ${err}`);
            }
        });

        return Promise.resolve(_.keys(bots));
    },

    getBots: () => {
        return bots;
    }
};
