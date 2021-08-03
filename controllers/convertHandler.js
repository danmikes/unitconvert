function numberStringSplitter(input) {
  let inputString = input.toLowerCase();
  let number = inputString.match(/[.\d\/]+/g) || ["1"];
  let string = inputString.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}

function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/");
  if (nums.length > 2) {
    return false;
  }
  return nums;
}

function ConvertHandler() {
  this.getNum = function (input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);

    if (!nums) {
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    result = Number(num1) / Number(num2);

    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1];

    switch (result) {
      case "kg":
      case "lbs":
      case "km":
      case "mi":
      case "l":
      case "gal":
        return result;
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit;
    
    switch (result) {
      case "kg":
        return "lbs";
      case "lbs":
        return "kg";
      case "km":
        return "mi";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "gal":
        return "L";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case "kg":
        return "kilograms";
      case "lbs":
        return "pounds";
      case "km":
        return "kilometers";
      case "mi":
        return "miles";
      case "L":
        return "litres";
      case "gal":
        return "gallons";
      default:
        return "ignoro";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      default:
        result = "ignorant";
        break;
    }

    return Number(result).toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
