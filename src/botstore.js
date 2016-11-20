'use strict';

const events = require('events');
const emitter = new events.EventEmitter();
const fs = require('fs');
const _ = require('lodash');
const logger = require('./log.js');
const botDir = `${__dirname}/bots`;

const commandEvent = (command) => {
    return `command-${_.toLower(command)}`;
};

const reactionEvent = (reaction) => {
    return `reaction-${_.toLower(reaction)}`;
};

module.exports = {

    load: () => {
        const files = fs.readdirSync(botDir);

        const loadedBots = _.map(files, (file) => {
            try {
                const bot = require(`${botDir}/${file}`);

                if (_.isFunction(bot.onStart)) {
                    emitter.on('start', bot.onStart);
                }

                if (_.isObject(bot.onCommand)) {
                    _.each(_.keysIn(bot.onCommand), (key) => {
                        if (_.isFunction(bot.onCommand[key])) {
                            emitter.on(commandEvent(key), bot.onCommand[key]);
                        }
                    });
                }

                if (_.isObject(bot.onReaction)) {
                    _.each(_.keysIn(bot.onReaction), (key) => {
                        if (_.isFunction(bot.onReaction[key])) {
                            emitter.on(reactionEvent(key), bot.onReaction[key]);
                        }
                    });
                } else if (_.isFunction(bot.onReaction)) {
                    emitter.on('reaction', bot.onReaction);
                }

                if (_.isFunction(bot.onMessage)) {
                    emitter.on('message', bot.onMessage);
                }

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

    emitStart: () => {
        return emitter.emit('start');
    },

    emitMessage: (message) => {
        return emitter.emit('message', message);
    },

    emitCommand: (message) => {
        return emitter.emit(commandEvent(message.command), message);
    }
};
