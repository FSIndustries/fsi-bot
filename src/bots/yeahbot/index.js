'use strict';

// offset 0x10
const arm =
    require('unicode-8.0.0/Block/Miscellaneous_Technical/Symbols')[16];
// offset OxA0
const glass =
    require('unicode-8.0.0/Block/Geometric_Shapes/Symbols')[0];
    // offset 0x22
const eye =
    require('unicode-8.0.0/Block/General_Punctuation/Symbols')[34];

const face = `${eye}\\_${eye}`;

const glasses = `${arm}${glass}-${glass}`;

const glassesFace = `${arm}${glass}\\_${glass}`;

const yeeeeeaaaaahhhh = `(${face})\n( ${face})>${glasses}\n(${glassesFace})`;

module.exports = {
    onCommand: {
        glasses: (message) => {
            message.reply(yeeeeeaaaaahhhh);
        },
        csi: (message) => {
            message.reply(yeeeeeaaaaahhhh);
        }
    }
};
