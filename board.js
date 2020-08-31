const { Game } = require("./game");
const { eqObjects, getRandomMaxInt } = require('./helper');

class Board extends Game {
  initBoard(width, height) {
    const boardArr = [];
    const water = this._tile.water;
    for (let i = 0; i < height; i++) {
      boardArr.push([water]);
      for (let j = 0; j < width - 1; j++) {
        boardArr[i].push(water);
      }
    }
    return boardArr;
  }
  constructor(width = 10, height = 10) {
    super();
    this._board = this.initBoard(width, height);
  }
  isBoardTile(sym) {
    for (const ele in this._tile) {
      if (this._tile[ele] === sym) {
        return true;
      }
    }
    return false;
  }
  get board() {
    let rowTxt = '', boardTxt = '';
    for (let i = 0; i < this._board.length; i++) {
      rowTxt = '';
      for (let j = 0; j < this._board[i].length; j++) {
        rowTxt += this._board[i][j];
      }
      boardTxt += rowTxt + '\n';
    }
    // console.log(boardTxt);
    return boardTxt;
  }
  printShiplessBoard() {
    let rowTxt = '', boardTxt = '';
    for (let i = 0; i < this._board.length; i++) {
      rowTxt = '';
      for (let j = 0; j < this._board.length; j++) {
        let sym = this._board[i][j];
        if (this.isBoardTile(sym)) {
          rowTxt += sym;
        } else {
          rowTxt += this._tile.water;
        }
      }
      boardTxt += rowTxt + '\n';
    }
    console.log(boardTxt);
    return boardTxt;
  }
  findFreeSpots(size) {
    const freeCoord = {h: [], v: []};
    const boardArr = this._board;
    for (let i = 0; i < boardArr.length; i++) {
      let lastFree = -1;
      for (let j = 0; j < boardArr[i].length; j++) {//check horizontal spots
        if (boardArr[i][j] === this._tile.water) {
          if (lastFree === -1) {
            lastFree = j;
          } else if (j - lastFree >= size - 1) {
            freeCoord.h.push([j, i]);
          }
        } else {
          lastFree = -1;
        }
      }
    }
    for (let i = 0; i < boardArr[0].length; i++) {
      let lastFree = -1;
      for (let j = 0; j < boardArr.length; j++) {//check vertical spots
        if (boardArr[j][i] === this._tile.water) {
          if (lastFree === -1) {
            lastFree = j;
          } else if (j - lastFree >= size - 1) {
            freeCoord.v.push([i, j]);
          }
        } else {
          lastFree = -1;
        }
      }
    }
    // console.log(`Size:${size}\nNumber of free vertical & horizontal spaces:${freeCoord.vertical.length}, ${freeCoord.horizontal.length}`);
    return freeCoord;
  }
  setShipOccupies(ship) {
    let x = ship.coord[0];
    let y = ship.coord[1];
    let size = this.shipTypes[ship.type].size;
    ship.occupies = [];
    for (let i = 0; i < size; i++) {
      ship.occupies.push([x, y]);
      if (ship.orient === 'h') {
        x--;
      } else {
        y--;
      }
    }
  }
  placeShipOnBoard(ship) {
    let x;
    let y;
    let board = this._board;
    let sym;

    for (let i = 0; i < ship.occupies.length; i++) {
      sym = this.shipTypes[ship.type].sym;
      x = ship.occupies[i][0];
      y = ship.occupies[i][1];
      board[y][x] = sym;
    }
  }
  positionShips(shipsRequested = this.shipsDefaultCount) {
    const output = [];
    let freeSpots;
    let shipOrientation;
    for (const shipTypeToPlace in shipsRequested) {
      for (let i = 0; i < shipsRequested[shipTypeToPlace]; i++) {
        freeSpots = this.findFreeSpots(this.shipTypes[shipTypeToPlace].size);
        if (freeSpots.h.length !== 0 || freeSpots.v.length !== 0) {
          if (freeSpots.h.length === 0) {
            shipOrientation = 'v';
          } else if (freeSpots.v.length === 0) {
            shipOrientation = 'h';
          } else {
            shipOrientation = getRandomMaxInt(1);
            shipOrientation === 0 ? shipOrientation = 'h' : shipOrientation = 'v';
          }
          output.push({
            type: shipTypeToPlace,
            coord: freeSpots[shipOrientation][getRandomMaxInt(freeSpots[shipOrientation].length - 1)],
            orient: shipOrientation,
            hits: [],
            sunk: false,
          });
          this.setShipOccupies(output[output.length - 1]);
          this.placeShipOnBoard(output[output.length - 1]);
        }
      }
    }
    // console.log(output.ships[3].occupies);
    this._ships = output;
    return output;
  }
  getIndexOfShipHit(coord) {
    let ships = this._ships;
    for (let i = 0; i < ships.length; i++) {
      for (let j = 0; j < ships[i].occupies.length; j++) {
        if (eqObjects(ships[i].occupies[j], coord)) {
          return i;
        }
      }
    }
    return -1;
  }
  setSunk(ship) {
    let boardObj = this._board;
    for (let i = 0; i < ship.occupies.length; i++) {
      if (boardObj[ship.occupies[i][1]][ship.occupies[i][0]] === this.shipTypes[ship.type].sym) {
        ship.sunk = false;
        return false;
      }
    }
    ship.sunk = true;
    return true;
  }
  placeHit(xCoord, yCoord) {
    let x = Number(xCoord);
    let y = Number(yCoord);
    const board = this._board;
    const water = this._tile.water;
    const miss = this._tile.miss;
    const hit = this._tile.hit;
    const sunk = this._tile.sunk;
    let shipHit;
    if (x !== undefined && y !== undefined && x >= 0 && y >= 0 && x < board[0].length && y < board.length) {
      if (board[y][x] !== water && board[y][x] !== miss) {
        shipHit = this._ships[this.getIndexOfShipHit([x, y])];
        board[y][x] = hit;
        if (this.setSunk(shipHit)) {
          for (let i = 0; i < shipHit.occupies.length; i++) {//mark as sunk on board
            x = shipHit.occupies[i][0];
            y = shipHit.occupies[i][1];
            board[y][x] = sunk;
          }
        }
        return true;
      } else {
        board[y][x] = miss;
        return false;
      }
    }
  }
}


// const board = {
//   sym: {
//     water: '🟦',
//     miss: '⬜️',
//     hit: '🟥',
//     sunk: '⬛️',
//   },
//   isBoardTile: function(txt) {
//     for (const ele in this.sym) {
//       if (this.sym[ele] === txt) {
//         return true;
//       }
//     }
//     return false;
//   },
//   initBoard: function(height = 10, width = 10, sym = this.sym.water) {
//     const boardArr = [];
//     for (let i = 0; i < height; i++) {
//       boardArr.push([sym]);
//       for (let j = 0; j < width - 1; j++) {
//         boardArr[i].push(sym);
//       }
//     }
//     return boardArr;
//   },
//   printBoard: function(boardArr) {
//     let rowTxt = '', boardTxt = '';
//     for (let i = 0; i < boardArr.length; i++) {
//       rowTxt = '';
//       for (let j = 0; j < boardArr.length; j++) {
//         rowTxt += boardArr[i][j];
//       }
//       boardTxt += rowTxt + '\n';
//     }
//     console.log(boardTxt);
//     return boardTxt;
//   },
//  printShiplessBoard: function(boardArr) {
//     let rowTxt = '', boardTxt = '';
//     for (let i = 0; i < boardArr.length; i++) {
//      rowTxt = '';
//       for (let j = 0; j < boardArr.length; j++) {
//         let txt = boardArr[i][j];
//         if (this.isBoardTile(txt)) {
//           rowTxt += txt;
//        } else {
//           rowTxt += this.sym.water;
//         }
//      }
//       boardTxt += rowTxt + '\n';
//     }
//     console.log(boardTxt);
//     return boardTxt;
//   },
// };

module.exports = { Board };