'use strict';

const _ = require('lodash');
const events = require('events');
const emitter = new events.EventEmitter();

const startEvent = 'start';
const messageEvent = 'message';
const reactionEvent = 'reaction';

const commandEvent = (command) => {
    return `command-${_.toLower(command)}`;
};
const specificReactionEvent = (reaction) => {
    return `reaction-${_.toLower(reaction)}`;
};

module.exports = {

    registerBot: (bot) => {

        if (_.isFunction(bot.onStart)) {
            emitter.on(startEvent, bot.onStart);
        }

        if (_.isFunction(bot.onMessage)) {
            emitter.on(messageEvent, bot.onMessage);
        }

        if (_.isObject(bot.onCommand)) {
            _.each(_.keys(bot.onCommand), (key) => {
                if (_.isFunction(bot.onCommand[key])) {
                    emitter.on(commandEvent(key), bot.onCommand[key]);
                }
            });
        }

        if (_.isObject(bot.onReaction)) {
            _.each(_.keys(bot.onReaction), (key) => {
                if (_.isFunction(bot.onReaction[key])) {
                    emitter.on(specificReactionEvent(key), bot.onReaction[key]);
                }
            });
        } else if (_.isFunction(bot.onReaction)) {
            emitter.on(reactionEvent, bot.onReaction);
        }

        return bot;
    },

    emitStart: () => {
        return emitter.emit(startEvent);
    },

    emitMessage: (message) => {
        return emitter.emit(messageEvent, message);
    },

    emitCommand: (message) => {
        return emitter.emit(commandEvent(message.command), message);
    },

    emitReaction: (reaction) => {
        emitter.emit(reactionEvent, reaction);
        emitter.emit(specificReactionEvent(reaction));
    }
};
