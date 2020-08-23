const board = require('./board');
const ship = require('./ship');

const printBoard = function(boardArr) {
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
};

const battleship = function() {
  const playerBoard = board.initBoard(10, 10, '🟦');
  // const ships = placeShips(board);
  printBoard(playerBoard);
};

battleship();