const board = {
  initBoard: function(height = 10, width = 10, sym = '🟦') {
    const boardArr = [];
    for (let i = 0; i < height; i++) {
      boardArr.push([sym]);
      for (let j = 0; j < width - 1; j++) {
        boardArr[i].push(sym);
      }
    }
    return boardArr;
  },
};

module.exports = board;