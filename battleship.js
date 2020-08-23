const board = require('./board');
const ship = require('./ship');
// const eqObjects = require('./eqObjects');
// const eqObj = eqObjects.eqObjects;

const placeHit = function(boardObj, coord) {
  let x = coord[0];
  let y = coord[1];
  let boardRef = boardObj.board;
  let shipHit;
  if (Array.isArray(coord)) {
    if (boardRef[y][x] !== board.sym.water && boardRef[y][x] !== board.sym.miss) {
      shipHit = boardObj.ships[ship.getIndexOfShipHit(boardObj, coord)];
      boardRef[y][x] = board.sym.hit;
      // console.log(shipHit.type);
      if (ship.isSunk(boardRef, shipHit)) {
        for (let i = 0; i < shipHit.occupies.length; i++) {//mark as sunk on board
          x = shipHit.occupies[i][0];
          y = shipHit.occupies[i][1];
          boardRef[y][x] = board.sym.sunk;
        }
      }
      return true;
    } else {
      boardRef[y][x] = board.sym.miss;
      return false;
    }
  }
};

const battleship = function() {
  board.sym = {
    water: '🟦',
    miss: '🔘',
    hit: '🔥',
    sunk: '❌',
  };
  const enemyBoardObj = ship.positionShips(board.initBoard());
  const playerBoardObj = ship.positionShips(board.initBoard());
  ship.placeShipOnBoard(playerBoardObj);
  ship.placeShipOnBoard(enemyBoardObj);
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
  placeHit(enemyBoardObj,[0,0]);
  placeHit(enemyBoardObj,[0,1]);
  placeHit(enemyBoardObj,[0,2]);
  placeHit(enemyBoardObj,[0,3]);
  placeHit(enemyBoardObj,[0,4]);
  placeHit(enemyBoardObj,[0,5]);
  placeHit(enemyBoardObj,[0,6]);
  placeHit(enemyBoardObj,[0,7]);
  placeHit(enemyBoardObj,[0,8]);
  placeHit(enemyBoardObj,[0,9]);
  placeHit(enemyBoardObj,[9,9]);
  placeHit(enemyBoardObj,[4,4]);
  placeHit(enemyBoardObj,[5,4]);
  placeHit(enemyBoardObj,[4,5]);
  placeHit(enemyBoardObj,[5,5]);
  board.printBoard(playerBoardObj.board);
  board.printBoard(enemyBoardObj.board);
};

battleship();