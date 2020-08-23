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
  const playerBoardObj = ship.placeShips(board.initBoard());
  printBoard(playerBoardObj.board);
};

battleship();