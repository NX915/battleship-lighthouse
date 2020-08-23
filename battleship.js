const readline = require('readline');

const printBoard = function(boardArr) {
  let rowTxt = '', boardTxt = '';
  for (let i = 0; i < boardArr.length; i++) {
    rowTxt = '';
    for (let j = 0; j < boardArr.length; j++) {
      rowTxt += boardArr[i][j];
    }
    boardTxt += rowTxt + '\n';
  }
  console.log(boardTxt);
  return boardTxt;
};

const makeBoard = function(height = 10, width = 10, sym = '💦') {
  const boardArr = [];
  for (let i = 0; i < height; i++) {
    boardArr.push([sym]);
    for (let j = 0; j < width - 1; j++) {
      boardArr[i].push(sym);
    }
  }
  return boardArr;
};

const battleship = function() {
  const board = makeBoard();
  printBoard(board);
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });

  // readline.cursorTo(process.stdout, 0, 0);
  // rl.write('Welcome to Battleship!\nStart? (y/n)');
  // rl.on('line', (input) => {
  //   console.log(`Received: ${input}`);
  // });
  // readline.clearScreenDown(process.stdout);
  // rl.write(printBoard(board));
  // writeWaitingPercent("100%");

  // rl.on('line', (input) => {
  //   console.log(`Received: ${input}`);
  // });

  // rl.setPrompt('Next coord please: ');
  // let answer = rl.prompt(true);
  // console.log(answer);
  // readline.emitKeypressEvents(process.stdin);
  // // Simulate Ctrl+u to delete the line written previously
  // rl.write(null, { ctrl: true, name: 'u' });

  /*   rl.question('What do you think of Node.js? ', (answer) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);
    rl.close();
    return answer;
  }); */
};

battleship();

module.exports = makeBoard;