'use strict';

const config = require('./config.js');
const logger = require('./log.js');
const parser = require('./parser.js');
const botstore = require('./botstore.js');
const Discord = require('discord.js');
const client = new Discord.Client();

const onReady = () => {
    logger.info('Successfully connected to Discord, let\'s party!');
};

const onMessage = (message) => {
    const parsedMessage = parser.parseMessage(message);

    // Ignore messages from bots
    if (!message.author.bot) {

        // Emit the message as a whole first
        botstore.emitMessage(parsedMessage);

        // Emit the command to all listening bots
        if (parsedMessage.command) {

            if (parsedMessage.allCapsCommand) {
                message.reply('Hey now, no need to yell. Chill out dummy.');
            }

            if (!botstore.emitCommand(message)) {
                message.reply(`\`${parsedMessage.command}\` is not a real command, are you sure you know what you're doing?`);
            }
        }
    }
};

const onReaction = (reaction) => {
    logger.info('Got a reaction!');
};

module.exports = {

    start: () => {

        client.on('ready', onReady);
        client.on('message', onMessage);
        client.on('messageReactionAdd', onReaction);

        logger.info('Connecting to Discord, here we go!');
        return client.login(config.get('discord:token'));
    }
};
