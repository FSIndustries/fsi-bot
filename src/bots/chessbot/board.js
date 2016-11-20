const _ = require('lodash');
const chess = require('chess.js');

const black = '\u265A';
const allbox = _.map(_.range(9472, 9472+200), b => String.fromCharCode(b));
const box = _.forOwn({
    vbar: 3,
    hbar: 1,
    ul  :13,
    ur  :17,
    ll  :21,
    lr  :25,
    nt  :45,
    st  :53,
    wt  :29,
    et  :37,
    plus:60
  },
(val, key, obj) => {
  obj[key] = String.fromCharCode(val+9472);
});

const pieces = _.forOwn({
  wKing: 0,
  wQueen: 1,
  wRook: 2,
  wBishop: 3,
  wKnight: 4,
  wPawn: 5,
  bKing: 6,
  bQueen: 7,
  bRook: 8,
  bBishop: 9,
  bKnight: 10,
  bPawn: 11
},
    (v, k, o) => o[k] = String.fromCharCode(v+9812));

const h3 = `${box.hbar}`.repeat(2);

const innertop = `${h3}${box.nt}`.repeat(7);
const innermid = `${h3}${box.plus}`.repeat(7);
const innerbot = `${h3}${box.st}`.repeat(7);
// constant unicode strings to draw the square borders
const topline = `${box.ul}${innertop}${h3}${box.ur}\n`;
const midline = `${box.wt}${innermid}${h3}${box.et}\n`;
const botline = `${box.ll}${innermid}${h3}${box.lr}\n`;

// output from fen/zobrist parser goes here
const tuple = box.vbar +  `  ${black}  ${box.vbar}`.repeat(8) + '\n';

const rowsBottom = `${tuple}${midline}`;

module.exports = {
    render: () => {
      const board = topline + `${tuple}${midline}`.repeat(7) + tuple + botline;
      return board;
    }
};
