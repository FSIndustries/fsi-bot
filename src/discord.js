'use strict';

const config = require('./config.js');
const logger = require('./log.js');
const parser = require('./message.parser.js');
const Discord = require('discord.js');
const client = new Discord.Client();

let emitter;

const onReady = () => {
    logger.info('Connected to Discord');
};

const onMessage = (message) => {
    const parsedMessage = parser.parse(message);

    // Ignore messages from bots
    if (!message.author.bot) {

        // Emit the message as a whole first
        emitter.emit('message', parsedMessage);

        // Emit the command to all listening bots
        if (parsedMessage.command) {
            if (!emitter.emit(parsedMessage.command, parsedMessage)) {
                message.reply(`${parsedMessage.command} is not a real command, are you sure you know what you're doing?`);
            }
        }
    }
};

module.exports = {

    start: (_emitter) => {
        emitter = _emitter;

        client.on('ready', onReady);
        client.on('message', onMessage);

        return client.login(config.get('discord:token'));
    }
};
