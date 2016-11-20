'use strict';

const _ = require('lodash');
const emojione = require('emojione');

const isCommand = (message) => {
    return _.startsWith(message, '/');
};

const hasCommandContent = (content) => {
    return content.indexOf(' ') >= 0;
};

const getCommand = (message) => {
    let command = message.content;
    if (isCommand(command)) {

        if (hasCommandContent(command)) {
            command = _.split(command, ' ')[0];
        }
        return command.substring(1);
    }
};

const getContent = (message) => {
    const content = message.content;
    if (isCommand(content)) {

        if (hasCommandContent(content)) {
            return _.join(_.drop(_.split(content, ' ')), ' ');
        }
        return;
    }
    return content;
};

const getEmojiName = (emoji) => {
    let name = emojione.toShort(emoji.name);

    if (_.startsWith(name, ':')) {
        name = name.substring(1);
    }

    if (_.endsWith(name, ':')) {
        name = name.substring(0, name.length - 1);
    }

    return name;
};

module.exports = {

    parseMessage: (message) => {
        return _.assign(message, {
            command: getCommand(message),
            content: getContent(message),
        });
    },

    parseReaction: (reaction, user) => {
        return _.assign(reaction, {
            user,
            emojiName: getEmojiName(reaction.emoji)
        });
    }
};
