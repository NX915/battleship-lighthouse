class Game {
  constructor() {
    this._tile = {
      water: '🟦',
      miss: '🔘',
      hit: '🔥',
      sunk: '❌',
    };
    this.shipTypes = {
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
    };
    this.shipsDefaultCount = {
      carrier: 1,
      battleship: 1,
      cruiser: 1,
      submarine: 1,
      destroyer: 1,
    };
  }
}

module.exports = { Game };