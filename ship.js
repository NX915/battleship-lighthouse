const board = require("./board");

const ship = {
  shipTypes: {
    carrier: {
      size: 5,
      sym: '🟪',
    },
    battleship: {
      size: 4,
      sym: '🟥'
    },
    cruiser: {
      size: 3,
      sym: '🟢'
    },
    submarine: {
      size: 3,
      sym: '⚫️'
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
            freeCoord.horizontal.push([i, j]);
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
            freeCoord.vertical.push([i, j]);
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
    let freeCoordObj;
    let shipOrientation = this.getRandomMaxInt(1);
    for (const shipTypeToPlace in shipsRequested) {
      for (let i = 0; i < shipsRequested[shipTypeToPlace]; i++) {
        freeCoordObj = this.getFreeCoord(boardArr, this.shipTypes[shipTypeToPlace].size);
        if (freeCoordObj.horizontal.length !== 0 || freeCoordObj.vertical.length !== 0) {
          if (freeCoordObj.horizontal.length === 0) {
            shipOrientation = 'vertical';
          } else if (freeCoordObj.vertical.length === 0) {
            shipOrientation = 'horizontal';
          } else {
            shipOrientation === 0 ? shipOrientation = 'horizontal' : shipOrientation = 'vertical';
          }
          shipArr.push({
            type: shipTypeToPlace,
            coord: freeCoordObj[shipOrientation][this.getRandomMaxInt(freeCoordObj[shipOrientation].length - 1)],
            orient: shipOrientation,
          });
        }
      }
    }
    console.log(shipArr);
    return boardArr;
  },
};
ship.placeShips([['🟦', '🟦', '🟦'], ['🟦', '🟦', '🟦', '🟦']], {destroyer: 1});
// console.log(ship.getFreeCoord([['🟦', '🟦', '🟦'], ['🔶', '🟦', '🟦', '🟦']], 2).horizontal);
// console.log(ship.getFreeCoord([['🟦', '🟦', '🟦'], ['🔶', '🟦', '🟦', '🟦']], 2).vertical);
module.exports = ship;