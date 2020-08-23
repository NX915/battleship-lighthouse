const ship = {
  shipTypes: {
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
  placeShips: function(boardArr, shipsRequested = this.shipsDefaultCount) {
    const shipArr = [];
    for (const shipType in shipsRequested) {
      for (let i = 0; i < shipsRequested[shipType]; i++) {
        this.randomCoord(boardArr);
      }
    }
    return boardArr;
  },
};

module.exports = ship;