'use strict';

const arm =
    require('unicode-8.0.0/Block/Box_Drawing/Symbols').get(0x10);
const glass =
    require('unicode-8.0.0/Block/Geometric_Shapes/Symbols').get(0xA0);
const eye =
    require('unicode-8.0.0/Block/General_Punctuation/Symbols').get(0x22);

const face = `${eye}\_${eye}`;

const glasses = `${arm}${glass}-${glass}`;

const glassesFace = `${arm}${glass}\_${glass}`;

const yeeeeeaaaaahhhh = `(${face})\n( ${face})>${glasses}\n(${glassesFace}`;

module.exports = {
    onGlasses: () => {
        message.reply(yeeeeeaaaaahhhh);
    },
    onCsi: () => {
        message.reply(yeeeeeaaaaahhhh);
    }
};
