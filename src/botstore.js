'use strict';

const events = require('events');
const emitter = new events.EventEmitter();
const fs = require('fs');
const _ = require('lodash');
const logger = require('./log.js');
const botDir = `${__dirname}/bots`;

module.exports = {

    load: () => {
        const files = fs.readdirSync(botDir);

        const loadedBots = _.map(files, (file) => {
            try {
                const bot = require(`${botDir}/${file}`);
                _.each(_.keysIn(bot), (key) => {
                    if (_.startsWith(key, 'on')) {
                        emitter.on(_.toLower(key.substring(2)), bot[key]);
                    }
                });
                return file;
            } catch (err) {
                logger.error(`Failed to load ${file}: ${err}`);
                return undefined;
            }
        });

        return Promise.resolve(_.filter(loadedBots, (bot) => {
            return !!bot;
        }));
    },

    emitter
};
