'use strict';

const config = require('./util/config.js');
const botRouter = require('./bot.router.js');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {

    start: () => {
        client.on('ready', botRouter.onReady);
        client.on('message', botRouter.onMessage);
        client.on('messageReactionAdd', botRouter.onReaction);
        return client.login(config.get('discord:token'));
    }
};
