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

};

battleship();

module.exports = makeBoard;