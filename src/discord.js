'use strict';

const _ = require('lodash');
const config = require('./config.js');
const logger = require('./log.js');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {

    start: (emitter) => {

        client.on('ready', () => {
            logger.info('Connected to Discord') ;
        });

        client.on('message', (message) => {
            const content = message.content;

            // Emit the message as a whole first
            emitter.emit('message', message);

            // If it starts with a /, parse out the command
            if (_.startsWith(content, '/')) {

                let cmd;

                if (content.indexOf(' ') >= 0) {
                    cmd = _.split(content, ' ')[0];
                } else {
                    cmd = content;
                }

                const body = _.trim(content.substring(cmd.length));
                cmd = _.toLower(cmd.substring(1));

                emitter.emit(cmd, message, body);
            }
        });

        return client.login(config.get('discord:token'));
    }
};
