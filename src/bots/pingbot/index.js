'use strict';

module.exports = {
    onPing: (message, body) => {
        if (body) {
            message.reply('Pong! Why supply extra params? It\'s a pong, idiot.');
        } else {
            message.reply('Pong!');
        }
    }
};
