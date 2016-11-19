'use strict';

module.exports = {
    onPing: (message) => {
        if (message.content) {
            message.reply('Pong! Why supply extra params? It\'s a pong, idiot.');
        } else {
            message.reply('Pong!');
        }
    }
};
