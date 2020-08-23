const assertEqual = function(actual, expected) {
  if (actual === expected) {
    console.log(`✅✅✅ Assertion Passed: [${actual}] === [${expected}]`);
  } else {
    console.log(`🛑🛑🛑 Assertion Failed: [${actual}] !== [${expected}]`);
  }
};

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



// const ab = { a: "1", b: "2" };
// const ba = { b: "2", a: "1" };
// assertEqual(eqObjects(ab, ba), true); // => true

// const abc = { a: "1", b: "2", c: "3" };
// assertEqual(eqObjects(ab, abc), false); // => false

// const cd = { c: "1", d: ["2", 3] };
// const dc = { d: ["2", 3], c: "1" };
// assertEqual(eqObjects(cd, dc), true); // => true

// const cd2 = { c: "1", d: ["2", 3, 4] };
// assertEqual(eqObjects(cd, cd2), false); // => false

// const cd3 = { c: "1", d: ["2", 3, 4] };
// assertEqual(eqObjects(cd2, cd3), true); // => false

// assertEqual(eqObjects({ a: { z: 1 }, b: 2 }, { a: { z: 1 }, b: 2 }), true); // => true
// assertEqual(eqObjects({c: [{a: 1, b: 3}, {k: 2, o: 2}]}, {c: [{a: 1, b: 3}, {k: 2, o: 2}]}), true); // => true

// assertEqual(eqObjects({ a: { y: 0, z: 1 }, b: 2 }, { a: { z: 1 }, b: 2 }), false); // => false
// assertEqual(eqObjects({ a: { y: 0, z: 1 }, b: 2 }, { a: 1, b: 2 }), false); // => false

module.exports.eqObjects = eqObjects;