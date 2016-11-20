'use strict';

const _ = require('lodash');

module.exports = {
    onMessage: (message) => {
        if (message.command && message.command === _.toUpper(message.command)) {
            message.reply('Hey now, no need to yell. Chill out dummy.');
        }
    }
};
