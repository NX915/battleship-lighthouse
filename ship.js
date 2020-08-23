const board = require("./board");

const ship = {
  shipSize: {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
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
      horizontal: [],
      vertical: [],
    };
    for (let i = 0; i < boardArr.length; i++) {
      let lastFree = -1;
      for (let j = 0; j < boardArr[i].length; j++) {//check horizontal spots
        if (boardArr[i][j] === '🟦') {
          if (lastFree === -1) {
            lastFree = j;
          } else if (j - lastFree >= size - 1) {
            freeCoord.horizontal.push([[i],[j]]);
          }
        } else {
          lastFree = -1;
        }
      }
    }
    for (let i = 0; i < boardArr[0].length; i++) {
      let lastFree = -1;
      for (let j = 0; j < boardArr.length; j++) {//check vertical spots
        if (boardArr[j][i] === '🟦') {
          if (lastFree === -1) {
            lastFree = j;
          } else if (j - lastFree >= size - 1) {
            freeCoord.vertical.push([[i],[j]]);
          }
        } else {
          lastFree = -1;
        }
      }
    }
    return freeCoord;
  },
  placeShips: function(boardArr, shipsRequested = this.shipsDefaultCount) {
    const shipArr = [];
    let shipOrientation;
    for (const shipType in shipsRequested) {
      for (let i = 0; i < shipsRequested[shipType]; i++) {
        this.getFreeCoord(boardArr, this.shipSize[shipsRequested]);
        // shipArr.push({});
      }
    }
    return boardArr;
  },
};

console.log(ship.getFreeCoord([['🟦', '🟦', '🟦'], ['🔶', '🟦', '🟦', '🟦']], 2).horizontal);
console.log(ship.getFreeCoord([['🟦', '🟦', '🟦'], ['🔶', '🟦', '🟦', '🟦']], 2).vertical);
module.exports = ship;