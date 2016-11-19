'use strict';

const events = require('events');
const emitter = new events.EventEmitter();
const fs = require('fs');
const _ = require('lodash');
const botDir = `${__dirname}/bots`;

module.exports = {

    load: () => {
        const files = fs.readdirSync(botDir);

        return Promise.resolve(_.map(files, (file) => {

            const bot = require(`${botDir}/${file}`);
            _.each(_.keysIn(bot), (key) => {
                if (_.startsWith(key, 'on')) {
                    emitter.on(_.toLower(key.substring(2)), bot[key]);
                }
            });

            return file;
        }));
    },

    emitter
};
