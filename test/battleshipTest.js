const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const board = require('../board');
const ship = require('../ship');
const waterSym = board.sym.water;

describe("initBoard function create an nested array representing a 2D game board", function() {
  it("Make a board array with 10 elements by default", () => {
    assert.equal(board.initBoard().length, 10);
  });
  it("Make a board array with 10 nested elements by default", () => {
    assert.equal(board.initBoard()[0].length, 10);
  });
  it(`Make a board array with nested elements of ${waterSym} default`, () => {
    assert.equal(board.initBoard()[0][0], waterSym);
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
    let testBoard = [[waterSym]];
    expect(ship.randomCoord(testBoard).x).to.within(0, 1);
  });
  it("return y between 0 and 1 with board size 1x1", () => {
    let testBoard = [[waterSym]];
    expect(ship.randomCoord(testBoard).y).to.within(0, 1);
  });
  it("return x between 0 and 2 with board size 2x2", () => {
    let testBoard = [[waterSym, waterSym], [waterSym, waterSym]];
    expect(ship.randomCoord(testBoard).x).to.within(0, 2);
  });
  it("return y between 0 and 2 with board size 2x2", () => {
    let testBoard = [[waterSym, waterSym], [waterSym, waterSym]];
    expect(ship.randomCoord(testBoard).y).to.within(0, 2);
  });
  it("return x between 0 and 5 with board size 5x1", () => {
    let testBoard = [[waterSym, waterSym, waterSym, waterSym, waterSym]];
    expect(ship.randomCoord(testBoard).x).to.within(0, 5);
  });
  it("return y between 0 and 1 with board size 5x1", () => {
    let testBoard = [[waterSym, waterSym, waterSym, waterSym, waterSym]];
    expect(ship.randomCoord(testBoard).y).to.within(0, 1);
  });
  it("return x between 0 and 1 with board size 1x5", () => {
    let testBoard = [[waterSym], [waterSym], [waterSym], [waterSym], [waterSym]];
    expect(ship.randomCoord(testBoard).x).to.within(0, 1);
  });
  it("return y between 0 and 5 with board size 1x5", () => {
    let testBoard = [[waterSym], [waterSym], [waterSym], [waterSym], [waterSym]];
    expect(ship.randomCoord(testBoard).y).to.within(0, 5);
  });
});
describe("placeShip will place ships into a random spot on given board if space allows", function() {
  const destroyerSym = ship.shipTypes.destroyer.sym;
  const dd = destroyerSym + destroyerSym;
  const cruiserSym = ship.shipTypes.cruiser.sym;
  const ca = cruiserSym + cruiserSym + cruiserSym;
  it(`Will not place a destroyer (${dd}) into \n\t${waterSym}`, () => {
    let testBoard = [waterSym];
    expect(ship.positionShips(testBoard, {destroyer: 1}).board).to.eql([waterSym]);
  });
  it(`Will not place a destroyer (${dd}) into \n\t${ca}\n\t${waterSym}`, () => {
    let testBoard = [[cruiserSym, cruiserSym, cruiserSym], [waterSym]];
    expect(ship.positionShips(testBoard, {destroyer: 1}).board).to.eql([[cruiserSym, cruiserSym, cruiserSym], [waterSym]]);
  });
  it(`Will place a destroyer (${dd}) into \n\t${waterSym}${waterSym}`, () => {
    let testBoard = [[waterSym, waterSym]];
    expect(ship.positionShips(testBoard, {destroyer: 1}).board).to.eql([[destroyerSym, destroyerSym]]);
  });
  it(`Will place a destroyer (${dd}) into \n\t${waterSym}\n\t${waterSym}`, () => {
    let testBoard = [[waterSym], [waterSym]];
    expect(ship.positionShips(testBoard, {destroyer: 1}).board).to.eql([[destroyerSym], [destroyerSym]]);
  });
  it(`Will not place a cruiser (${ca}) into \n\t${waterSym}${waterSym}`, () => {
    let testBoard = [[waterSym, waterSym]];
    expect(ship.positionShips(testBoard, {cruiser: 1}).board).to.eql([[waterSym, waterSym]]);
  });
  it(`Will not place a cruiser (${ca}) into \n\t${waterSym}\n\t${waterSym}`, () => {
    let testBoard = [[waterSym], [waterSym]];
    expect(ship.positionShips(testBoard, {cruiser: 1}).board).to.eql([[waterSym], [waterSym]]);
  });
  it(`Will place a cruiser (${ca}) into \n\t${waterSym}${waterSym}${waterSym}`, () => {
    let testBoard = [[waterSym, waterSym, waterSym]];
    expect(ship.positionShips(testBoard, {cruiser: 1}).board).to.eql([[cruiserSym, cruiserSym, cruiserSym]]);
  });
  it(`Will place a cruiser (${ca}) into \n\t${waterSym}\n\t${waterSym}\n\t${waterSym}`, () => {
    let testBoard = [[waterSym], [waterSym], [waterSym]];
    expect(ship.positionShips(testBoard, {cruiser: 1}).board).to.eql([[cruiserSym], [cruiserSym], [cruiserSym]]);
  });
  it(`Will not place a (${ca}) into \n\t${waterSym}${waterSym}${destroyerSym}\n\t${waterSym}${waterSym}${destroyerSym}`, () => {
    let testBoard = [[waterSym, waterSym, destroyerSym], [waterSym, waterSym, destroyerSym]];
    expect(ship.positionShips(testBoard, {cruiser: 1}).board).to.eql([[waterSym, waterSym, destroyerSym], [waterSym, waterSym, destroyerSym]]);
  });
});