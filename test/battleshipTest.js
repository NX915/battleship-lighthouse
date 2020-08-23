const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const board = require('../board');
const ship = require('../ship');

describe("initBoard function create an nested array representing a 2D game board", function() {
  it("Make a board array with 10 elements by default", () => {
    assert.equal(board.initBoard().length, 10);
  });
  it("Make a board array with 10 nested elements by default", () => {
    assert.equal(board.initBoard()[0].length, 10);
  });
  it("Make a board array with nested elements of 🟦 default", () => {
    assert.equal(board.initBoard()[0][0], '🟦');
  });
  it("Make a board array with 15 elements as first parameter", () => {
    assert.equal(board.initBoard(15).length, 15);
  });
  it("Make a board array with 15 nested elements as second parameter", () => {
    assert.equal(board.initBoard(10, 15)[0].length, 15);
  });
  it("Make a board array with nested elements of custom third parameter '💥'", () => {
    assert.equal(board.initBoard(10, 10, '💥')[0][0], '💥');
  });
});
describe("randomCoord return an object {x:y} coordinate within the argument board dimention", function() {
  it("return x between 0 and 1 with board size 1x1", () => {
    let testBoard = [['🟦']];
    expect(ship.randomCoord(testBoard).x).to.within(0, 1);
  });
  it("return y between 0 and 1 with board size 1x1", () => {
    let testBoard = [['🟦']];
    expect(ship.randomCoord(testBoard).y).to.within(0, 1);
  });
  it("return x between 0 and 2 with board size 2x2", () => {
    let testBoard = [['🟦', '🟦'], ['🟦', '🟦']];
    expect(ship.randomCoord(testBoard).x).to.within(0, 2);
  });
  it("return y between 0 and 2 with board size 2x2", () => {
    let testBoard = [['🟦', '🟦'], ['🟦', '🟦']];
    expect(ship.randomCoord(testBoard).y).to.within(0, 2);
  });
  it("return x between 0 and 5 with board size 5x1", () => {
    let testBoard = [['🟦', '🟦', '🟦', '🟦', '🟦']];
    expect(ship.randomCoord(testBoard).x).to.within(0, 5);
  });
  it("return y between 0 and 1 with board size 5x1", () => {
    let testBoard = [['🟦', '🟦', '🟦', '🟦', '🟦']];
    expect(ship.randomCoord(testBoard).y).to.within(0, 1);
  });
  it("return x between 0 and 1 with board size 1x5", () => {
    let testBoard = [['🟦'], ['🟦'], ['🟦'], ['🟦'], ['🟦']];
    expect(ship.randomCoord(testBoard).x).to.within(0, 1);
  });
  it("return y between 0 and 5 with board size 1x5", () => {
    let testBoard = [['🟦'], ['🟦'], ['🟦'], ['🟦'], ['🟦']];
    expect(ship.randomCoord(testBoard).y).to.within(0, 5);
  });
});
describe("placeShip will place ships into a random spot on given board if space allows", function() {
  it("Will not place a default destroyer size 2x1 (🔸) on a 1x1 empty default board (🟦)", () => {
    let testBoard = ['🟦'];
    expect(ship.placeShips(testBoard, {destroyer: 1}).board).to.eql(['🟦']);
  });
  it("Will place a default destroyer size 2x1 (🔸) on a 2x1 empty default board (🟦)", () => {
    let testBoard = [['🟦', '🟦']];
    expect(ship.placeShips(testBoard, {destroyer: 1}).board).to.eql([['🔸', '🔸']]);
  });
  it("Will place a default destroyer size 2x1 (🔸) on a 1x2 empty default board (🟦)", () => {
    let testBoard = [['🟦'], ['🟦']];
    expect(ship.placeShips(testBoard, {destroyer: 1}).board).to.eql([['🔸'], ['🔸']]);
  });
});