const board = require('./board');
const ship = require('./ship');
const eqObjects = require('./eqObjects');
const eqObj = eqObjects.eqObjects;

const placeHit = function(boardObj, coord) {
  if (Array.isArray(coord)) {
    if (boardObj.board[coord[1]][coord[0]] !== board.sym.water && boardObj.board[coord[1]][coord[0]] !== board.sym.miss) {
      boardObj.board[coord[1]][coord[0]] = board.sym.hit;
      console.log(boardObj.ships[ship.getShipHit(boardObj, coord)].type);
      console.log(ship.isSunk(boardObj, boardObj.ships[ship.getShipHit(boardObj, coord)]));
    } else {
      boardObj.board[coord[1]][coord[0]] = board.sym.miss;
    }
  }
};

const battleship = function() {
  const playerBoardObj = ship.positionShips(board.initBoard());
  board.printBoard(playerBoardObj.board);
  placeHit(playerBoardObj,[0,0]);
  placeHit(playerBoardObj,[0,1]);
  placeHit(playerBoardObj,[0,2]);
  placeHit(playerBoardObj,[0,3]);
  placeHit(playerBoardObj,[0,4]);
  placeHit(playerBoardObj,[0,5]);
  placeHit(playerBoardObj,[0,6]);
  placeHit(playerBoardObj,[0,7]);
  placeHit(playerBoardObj,[0,8]);
  placeHit(playerBoardObj,[0,9]);
  placeHit(playerBoardObj,[9,9]);
  placeHit(playerBoardObj,[4,4]);
  placeHit(playerBoardObj,[5,4]);
  placeHit(playerBoardObj,[4,5]);
  placeHit(playerBoardObj,[5,5]);
  board.printBoard(playerBoardObj.board);
};

battleship();