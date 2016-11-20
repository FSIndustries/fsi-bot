'use strict';

const chessbot = require('./chessbot.js');
const config = require('../../config.js');
const logger = require('../../log.js');

module.exports = {
    onChess: (message, body) => {
        chessbot.response(message, body);
    },
    onCh: (message, body) => {
        chessbot.response(message, body);
    }
};
