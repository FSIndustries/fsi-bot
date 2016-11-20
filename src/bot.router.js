'use strict';

const botEmitter = require('./bot.emitter.js');
const parser = require('./util/parser.js');

module.exports = {

    onReady: () => {
        botEmitter.emitStart();
    },

    onMessage: (message) => {
        const parsedMessage = parser.parseMessage(message);

        // Ignore messages from bots
        if (!message.author.bot) {

            // Emit the message as a whole first
            botEmitter.emitMessage(parsedMessage);

            // Emit the command to all listening bots
            if (parsedMessage.command && !botEmitter.emitCommand(message)) {
                message.reply(`\`${parsedMessage.command}\` is not a real command, are you sure you know what you're doing?`);
            }
        }
    },

    onReaction: (reaction) => {
        botEmitter.emitReaction(parser.parseReaction(reaction));
    }
};
