const chai = require('chai');
const assert = chai.assert;
const board = require('../board');
const ship = require('../ship');

describe("initBoard function", function() {
  it("Should make a board array with 10 elements by default", () => {
    assert.equal(board.initBoard().length, 10);
  });
  it("Should make a board array with 10 nested elements by default", () => {
    assert.equal(board.initBoard()[0].length, 10);
  });
  it("Should make a board array with nested elements of 🟦 default", () => {
    assert.equal(board.initBoard()[0][0], '🟦');
  });
  it("Should make a board array with 15 elements as first parameter", () => {
    assert.equal(board.initBoard(15).length, 15);
  });
  it("Should make a board array with 15 nested elements as second parameter", () => {
    assert.equal(board.initBoard(10, 15)[0].length, 15);
  });
  it("Should make a board array with nested elements of custom third parameter '💥'", () => {
    assert.equal(board.initBoard(10, 10, '💥')[0][0], '💥');
  });
});
describe("placeShip function", function() {
  it("Should place a destroyer size 2x1 (🔸) on a 1x2 empty default board (🟦)", () => {
    let testBoard = ['🟦', '🟦'];
    assert.equal(ship.placeShips(testBoard, {destoryer: 1}), ['🔸', '🔸']);
  });
  it("Should not place a destroyer size 2x1 (🔸) on a 1x1 empty default board (🟦)", () => {
    let testBoard = ['🟦'];
    assert.equal(ship.placeShips(testBoard, {destoryer: 1}), ['🟦']);
  });
});