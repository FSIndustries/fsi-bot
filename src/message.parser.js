'use strict';

const _ = require('lodash');

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
        return _.toLower(command.substring(1));
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

module.exports = {

    parse: (message) => {
        return _.assign(message, {
            command: getCommand(message),
            content: getContent(message),
        });
    }
};
