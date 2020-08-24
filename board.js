// const ship = require("./ship");

const board = {
  sym: {
    water: '🟦',
    miss: '⬜️',
    hit: '🟥',
    sunk: '⬛️',
  },
  isBoardTile: function(txt) {
    for (const ele in this.sym) {
      if (this.sym[ele] === txt) {
        return true;
      }
    }
    return false;
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
  printShiplessBoard: function(boardArr) {
    let rowTxt = '', boardTxt = '';
    for (let i = 0; i < boardArr.length; i++) {
      rowTxt = '';
      for (let j = 0; j < boardArr.length; j++) {
        let txt = boardArr[i][j];
        if (this.isBoardTile(txt)) {
          rowTxt += txt;
        } else {
          rowTxt += this.sym.water;
        }
      }
      boardTxt += rowTxt + '\n';
    }
    console.log(boardTxt);
    return boardTxt;
  },
};

module.exports = board;