// Returns true if both objects have identical keys with identical values.
// Otherwise you get back a big fat false!
const eqObjects = function(object1, object2) {
  const eqArrays = function(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i])) {
          if (!eqArrays(arr1[i], arr2[i])) {
            return false;
          }
        } else if (typeof arr1[i] === 'object') {
          if (!eqObjects(arr1[i], arr2[i])) {
            return false;
          }
        } else if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    }
  };
  if (Object.keys(object1).length === Object.keys(object2).length) {
    const objKeys = Object.keys(object1);
    for (let i = 0; i < objKeys.length; i++) {
      if (Array.isArray(object1[objKeys[i]])) {
        if (!eqArrays(object1[objKeys[i]], object2[objKeys[i]])) {
          return false;
        }
      } else if (typeof object1[objKeys[i]] === 'object') {
        if (!eqObjects(object1[objKeys[i]], object2[objKeys[i]])) {
          return false;
        }
      } else if (object1[objKeys[i]] !== object2[objKeys[i]]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};
const transpose = function(arr) {
  const output = [];
  for (let i = 0; i < arr[0].length; i++) {
    let newRow = [];
    for (let j = 0; j < arr.length; j++) {
      newRow.push(arr[j][i]);
    }
    output.push(newRow);
  }
  return output;
};
// console.log(transpose([[1,2],[3,4]]));
const getRandomMaxInt = function(max) {
  return Math.floor(Math.random() * (max + 1));
};

module.exports = { eqObjects, getRandomMaxInt };