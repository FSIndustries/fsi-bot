'use strict';

const nconf = require('nconf');

nconf.argv()
    .env({ lowerCase: true, separator: ':' })
    .file('local', { file: `${__dirname}/../../config/local.json` })
    .file('defaults', { file: `${__dirname}/../../config/default.json` });

module.exports = nconf;
