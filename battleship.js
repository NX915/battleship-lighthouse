const { Board } = require('./board');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const battleship = function() {
  const player1 = new Board();
  player1.positionShips();
  console.log(player1.board);
  rl.on('line', (userInput) => {
    player1.placeHit(userInput[0],userInput[1]);
    console.log(`${player1.board}`);
  });
};

battleship();