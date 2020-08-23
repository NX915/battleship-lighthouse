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
  placeShips: function(boardArr, shipsRequested = this.shipsDefaultCount) {
    
  },
};

module.exports = ship;