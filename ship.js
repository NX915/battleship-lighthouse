const board = require("./board");
const eqObjects = require('./eqObjects');
const eqObj = eqObjects.eqObjects;

const ship = {
  shipTypes: {
    carrier: {
      size: 5,
      sym: '🟣',
    },
    battleship: {
      size: 4,
      sym: '🟤'
    },
    cruiser: {
      size: 3,
      sym: '🟢'
    },
    submarine: {
      size: 3,
      sym: '🟡'
    },
    destroyer: {
      size: 2,
      sym: '🔸'
    }
  },
  shipsDefaultCount: {
    carrier: 1,
    battleship: 1,
    cruiser: 1,
    submarine: 1,
    destroyer: 1,
  },
  getRandomMaxInt: function(max) {
    return Math.floor(Math.random() * (max + 1));
  },
  randomCoord: function(boardArr) {
    const x = this.getRandomMaxInt(boardArr[0].length);
    const y = this.getRandomMaxInt(boardArr.length);
    return {x: x, y: y};
  },
  getFreeCoord: function(boardArr, size) {
    const freeCoord = {
      horizontal: [],//[x: board[0][0], y: board[0]]
      vertical: [],
    };
    for (let i = 0; i < boardArr.length; i++) {
      let lastFree = -1;
      for (let j = 0; j < boardArr[i].length; j++) {//check horizontal spots
        if (boardArr[i][j] === board.sym.water) {
          if (lastFree === -1) {
            lastFree = j;
          } else if (j - lastFree >= size - 1) {
            freeCoord.horizontal.push([j, i]);
          }
        } else {
          lastFree = -1;
        }
      }
    }
    for (let i = 0; i < boardArr[0].length; i++) {
      let lastFree = -1;
      for (let j = 0; j < boardArr.length; j++) {//check vertical spots
        if (boardArr[j][i] === board.sym.water) {
          if (lastFree === -1) {
            lastFree = j;
          } else if (j - lastFree >= size - 1) {
            freeCoord.vertical.push([i, j]);
          }
        } else {
          lastFree = -1;
        }
      }
    }
    // console.log(`Size:${size}\nNumber of free vertical & horizontal spaces:${freeCoord.vertical.length}, ${freeCoord.horizontal.length}`);
    return freeCoord;
  },
  placeShipOnBoard: function(input) {
    let board = input.board;
    let ship = input.ships[input.ships.length - 1];
    let x = ship.coord[0];
    let y = ship.coord[1];
    ship.occupies = [];
    let size = this.shipTypes[ship.type].size;
    let sym = this.shipTypes[ship.type].sym;
    for (let i = 0; i < size; i++) {
      board[y][x] = sym;
      ship.occupies.push([x, y]);
      if (ship.orient === 'horizontal') {
        x--;
      } else {
        y--;
      }
    }
  },
  positionShips: function(boardArr, shipsRequested = this.shipsDefaultCount) {
    const output = {board: [...boardArr], ships: []};
    let freeCoordObj;
    let shipOrientation;
    for (const shipTypeToPlace in shipsRequested) {
      for (let i = 0; i < shipsRequested[shipTypeToPlace]; i++) {
        freeCoordObj = this.getFreeCoord(output.board, this.shipTypes[shipTypeToPlace].size);
        if (freeCoordObj.horizontal.length !== 0 || freeCoordObj.vertical.length !== 0) {
          if (freeCoordObj.horizontal.length === 0) {
            shipOrientation = 'vertical';
          } else if (freeCoordObj.vertical.length === 0) {
            shipOrientation = 'horizontal';
          } else {
            shipOrientation = this.getRandomMaxInt(1);
            shipOrientation === 0 ? shipOrientation = 'horizontal' : shipOrientation = 'vertical';
          }
          output.ships.push({
            type: shipTypeToPlace,
            coord: freeCoordObj[shipOrientation][this.getRandomMaxInt(freeCoordObj[shipOrientation].length - 1)],
            orient: shipOrientation,
          });
          this.placeShipOnBoard(output);
        }
      }
    }
    // console.log(output.ships[3].occupies);
    return output;
  },
  getShipHit: function(boardObj, coord) {
    let ships = boardObj.ships;
    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i].occupies.length; j++) {
        if (eqObj(ships[i].occupies[j], coord)) {
          return i;
        }
      }
    }
  },
  isSunk: function(boardObj, ship) {
    let sunk = true;
    for (let i = 0; i < ship.occupies.length; i++) {
      if (boardObj.board[ship.occupies[i][1]][ship.occupies[i][0]] === this.shipTypes[ship.type].sym) {
        sunk = false;
        break;
      }
    }
    return sunk;
  },
};
// ship.positionShips([['🟦', '🟦', '🟦'], ['🟦', '🟦', '🟦', '🟦']], {destroyer: 2});
// console.log(ship.getFreeCoord([['🟦', '🟦', '🟦'], ['🟦', '🟦', '🟦', '🟦']], 2).horizontal);
// console.log(ship.getFreeCoord([['🟦', '🟦', '🟦'], ['🟦', '🟦', '🟦', '🟦']], 2).vertical);
module.exports = ship;