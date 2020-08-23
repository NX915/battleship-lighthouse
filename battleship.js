const board = require('./board');
const ship = require('./ship');

const battleship = function() {
  const playerBoardObj = ship.placeShips(board.initBoard());
  board.printBoard(playerBoardObj.board);
};

battleship();