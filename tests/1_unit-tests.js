const chai = require('chai');
const { devNull } = require('os');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Function convertHandler.getNum(input)', function () {
// 1. convertHandler should correctly read a whole number input.
  test('1. integer input', function (done) {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  })

// 2. convertHandler should correctly read a decimal number input.
  test('2. decimal input', function (done) {
    let input = '32.5L';
    assert.equal(convertHandler.getNum(input), 32.5);
    done();
  })

// 3. convertHandler should correctly read a fractional input.
  test('3. fractional input', function (done) {
    let input = '1/3L';
    assert.equal(convertHandler.getNum(input), 1 / 3);
    done();
  })

// 4. convertHandler should correctly read a fractional input with a decimal.
  test('4. fractional input + first decimal', function (done) {
    let input = '1.5/3L';
    assert.equal(convertHandler.getNum(input), 1.5 / 3);
    done();
  })

// 4b. convertHandler should correctly read a fractional input with a decimal.
  test('4b. extra: fractional input + second decimal', function (done) {
    let input = '1/3.5L';
    assert.equal(convertHandler.getNum(input), 1 / 3.5);
    done();
  })

  // 4c. extra: error on double-decimal.
  test('4c. extra: fractional input + double - decimal', function (done) {
    let input = '1.5/3.3L';
    assert.equal(convertHandler.getNum(input), 1.5 / 3.3);
    done();
  })

// 5. convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
  test('5. invalid input (double fraction)', function (done) {
    let input = '1/2/2L';
    assert.equal(convertHandler.getNum(input), undefined);
    done();
  })

// 5b. extra: error on double-dot
  test('5b. extra: invalid input (double dot)', function (done) {
    let input = '1.2.2L';
    assert.equal(convertHandler.getNum(input), undefined);
    done();
  })

// 6. convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test('6. no numerical input', function (done) {
    let input = 'L';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  })
})

suite('Function convertHandler.getUnit(input)', function () {
// 7. convertHandler should correctly read each valid input unit.
  test('7. for each valid unit input', function (done) {
    let input = [
      "gal",
      "kg",
      "km",
      "l",
      "mi",
      "lbs",
      "GAL",
      "KG",
      "KM",
      "L",
      "MI",
      "LBS",
    ];
    let output = [
      "gal",
      "kg",
      "km",
      "L",
      "mi",
      "lbs",
      "gal",
      "kg",
      "km",
      "L",
      "mi",
      "lbs",
    ];
    input.forEach(function (item, index) {
      assert.equal(convertHandler.getUnit(item), output[index]);
    })
    done();
  })

// 8. convertHandler should correctly return an error for an invalid input unit.
  test('8. unknown unit input', function (done) {
    let input = 'kilograms';
    assert.equal(convertHandler.getUnit(input), undefined);
    done();
  })
});

suite('Function convertHandler.convert(initUnit)', function () {
// 9. convertHandler should return the correct return unit for each valid input unit.
  test('9. for each valid unit input', function (done) {
    let input = ["gal", "kg", "km", "l", "lbs", "mi"];
    let output = ["L", "lbs", "mi", "gal", "kg", "km"];
    input.forEach(function (item, index) {
      assert.equal(convertHandler.getReturnUnit(item), output[index]);
    })
    done();
  })
});

suite('Function convertHandler.spellOutUnit(initUnit)', function () {
// 10. convertHandler should correctly return the spelled-out string unit for each valid input unit.
  test('10. for each valid unit input', function (done) {
    let input = [
      "gal","kg","km","L","lbs","mi"];
    let output = ["gallons","kilograms","kilometers","liters","pounds","miles"];
    input.forEach(function (item, index) {
      assert.equal(convertHandler.spellOutUnit(item), output[index]);
    })
    done();
  })
});

suite('Function convertHandler.convert(initNum, initUnit)', function () {

  const galToL = 3.78541;

// 11. convertHandler should correctly convert gal to L.
  test('11. gal to L', function (done) {
    let input = [1, "gal"];
    let output = galToL;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      output,
      0.1
    );
    done();
  })

// 12. convertHandler should correctly convert L to gal.
  test('12. L to gal', function (done) {
    let input = [1, "L"];
    let output = 1 / galToL;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      output,
      0.1
    );
    done();
  })

  const lbsToKg = 0.453592;

// 13. convertHandler should correctly convert mi to km.
  test('13. mi to km', function (done) {
    let input = [1, "mi"];
    let output = miToKm;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      output,
      0.1
    );
    done();
  })

// 14. convertHandler should correctly convert km to mi.
  test('14. km to mi', function (done) {
    let input = [1, "km"];
    let output = 1 / miToKm;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      output,
      0.1
    );
    done();
  })

  const miToKm = 1.60934;

// 15. convertHandler should correctly convert lbs to kg.
  test('15. lbs to kg', function (done) {
    let input = [1, "lbs"];
    let output = lbsToKg;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      output,
      0.1
    );
    done();
  })

// 16. convertHandler should correctly convert kg to lbs.
  test('16. kg to lbs', function (done) {
    let input = [1, "kg"];
    let output = 1 / lbsToKg;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      output,
      0.1
    );
    done();
  })
});
