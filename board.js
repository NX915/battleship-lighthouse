// const ship = require("./ship");

const board = {
  sym: {
    water: '🟦',
    miss: '⬜️',
    hit: '🟥',
    sunk: '⬛️',
  },
  initBoard: function(height = 10, width = 10, sym = this.sym.water) {
    const boardArr = [];
    for (let i = 0; i < height; i++) {
      boardArr.push([sym]);
      for (let j = 0; j < width - 1; j++) {
        boardArr[i].push(sym);
      }
    }
    return boardArr;
  },
  placeHit: function(boardObj, coord) {
    if (Array.isArray(coord)) {
      if (boardObj.board[coord[1]][coord[0]] !== this.sym.water && boardObj.board[coord[1]][coord[0]] !== this.sym.miss) {
        ship.checkSunk(boardObj, coord);
        boardObj.board[coord[1]][coord[0]] = this.sym.hit;
      } else {
        boardObj.board[coord[1]][coord[0]] = this.sym.miss;
      }
    }
  },
  printBoard: function(boardArr) {
    let rowTxt = '', boardTxt = '';
    for (let i = 0; i < boardArr.length; i++) {
      rowTxt = '';
      for (let j = 0; j < boardArr.length; j++) {
        rowTxt += boardArr[i][j];
      }
      boardTxt += rowTxt + '\n';
    }
    console.log(boardTxt);
    return boardTxt;
  },
};

module.exports = board;